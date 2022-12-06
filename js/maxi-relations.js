/* eslint-disable class-methods-use-this */

// Relations (IB)
class Relation {
	constructor(item) {
		this.uniqueID = item?.uniqueID;
		this.css = item?.css;

		if (!this.uniqueID || this.css.length === 0) return;

		this.trigger = item.trigger;
		this.triggerEl = document.querySelector(`.${this.trigger}`);
		this.blockTargetEl = document.querySelector(`#${this.uniqueID}`);
		this.target = item.target ?? '';
		this.fullTarget = `#${item.uniqueID} ${this.target}`;
		this.targetEl = document.querySelector(this.fullTarget);
		this.dataTarget = `#${item.uniqueID}[data-maxi-relations="true"]`;

		this.defaultTransition = window
			.getComputedStyle(this.targetEl)
			.getPropertyValue('transition');

		if (!this.triggerEl || !this.targetEl) return;

		this.breakpoints = ['general', 'xxl', 'xl', 'l', 'm', 's', 'xs'];
		this.hasMultipleTargetsArray = this.css.map(item =>
			Object.keys(item).some(key => !this.breakpoints.includes(key))
		);

		this.action = item.action;
		this.settings = item.settings;
		this.effects = item.effects;
		this.attributes = item.attributes;

		({ stylesObjs: this.stylesObjs, effectsObjs: this.effectsObjs } =
			this.generateCssResponsiveObj());

		this.breakpointsObj = this.generateBreakpointsObj();

		this.hoverStatus = this.effects.some(item => item.hoverStatus);
		this.isContained = this.triggerEl.contains(this.targetEl);
		this.isHoveredContained = this.hoverStatus && this.isContained;

		// transitionTrigger is an alternative trigger to target; not always used
		// Check its eventListeners to understand better about its responsibility
		this.transitionTriggers = Array.from(
			new Set(this.effects.map(item => item.transitionTrigger))
		);
		this.transitionTriggerEls = this.transitionTriggers.map(
			transitionTrigger =>
				transitionTrigger
					? this.blockTargetEl.querySelector(transitionTrigger)
					: this.targetEl
		);

		this.transitionTargetsArray = this.effects.map(item => {
			switch (typeof item.transitionTarget) {
				case 'string':
					return [item.transitionTarget];
				case 'object':
					if (item.transitionTarget?.length > 0)
						return item.transitionTarget;
					return [''];
				default:
					return [''];
			}
		});

		this.isBorderArray = this.attributes.map(attributes =>
			Object.keys(attributes).some(attr => attr.startsWith('border'))
		);
		this.isIconArray = item.settings.map(
			setting => setting === 'Icon colour' || setting === 'Button icon'
		);
		this.isSVG = this.fullTarget.includes('svg-icon-maxi');
		this.avoidHoverArray = [];
		this.getAvoidHover();

		this.transitionString = '';
		this.generateTransitions();

		this.stylesString = '';
		this.generateStyles();

		this.stylesEl = null;
		this.transitionEl = null;
		this.generateStylesEls();

		// Prevents removing the IB transitions before they end when mouse leave the IB trigger
		this.transitionTimeout = null;
		// Prevents IB transitions overwrite native hover ones (when is contained) when mouse
		// leave the hover transition trigger
		this.contentTimeout = null;

		this.init();
	}

	// Create two different <style> elements, one for the styles and one for the transitions.
	generateStylesEls() {
		this.stylesEl = document.createElement('style');
		this.stylesEl.id = `relations--${this.uniqueID}-styles`;
		this.stylesEl.setAttribute('data-type', this.action);
		this.stylesEl.setAttribute('data-settings', this.settings);
		this.stylesEl.innerText = this.stylesString;

		this.transitionEl = document.createElement('style');
		this.transitionEl.id = `relations--${this.uniqueID}-transitions`;
		this.transitionEl.setAttribute('data-type', this.action);
		this.transitionEl.setAttribute('data-settings', this.settings);
		this.transitionEl.innerText = this.transitionString;
	}

	// Insert transitions or styles element just after Maxi inline css element
	addStyleEl(styleEl) {
		if (!this.inlineStylesEl)
			this.inlineStylesEl = document.querySelector(
				'#maxi-blocks-inline-css'
			);

		const currentEl = document.querySelector(`#${styleEl.id}`);

		if (currentEl) {
			if (
				currentEl.getAttribute('data-type') === this.action &&
				currentEl.getAttribute('data-settings') === this.settings
			)
				currentEl.replaceWith(styleEl);
			else currentEl.insertAdjacentElement('afterend', styleEl);
		} else
			this.inlineStylesEl.parentNode.insertBefore(
				styleEl,
				this.inlineStylesEl.nextSibling
			);
	}

	getCurrentBreakpoint() {
		const winWidth = window.innerWidth;

		let currentBreakpoint = 'general';

		Object.entries(this.breakpointsObj).forEach(([breakpoint, value]) => {
			if (!['general', 'xxl'].includes(breakpoint)) {
				if (breakpoint === 'general') return;

				if (winWidth <= this.breakpointsObj.xl)
					currentBreakpoint = breakpoint;
			}
			if (winWidth <= value) currentBreakpoint = breakpoint;
		});

		return currentBreakpoint;
	}

	getLastUsableBreakpoint(currentBreakpoint, callback) {
		return [...this.breakpoints]
			.splice(0, this.breakpoints.indexOf(currentBreakpoint) + 1)
			.reverse()
			.find(breakpoint => callback(breakpoint));
	}

	getTransitionTimeout() {
		const currentBreakpoint = this.getCurrentBreakpoint();

		const getTransitionValue = (effects, prop) =>
			effects[
				`transition-${prop}-${this.getLastUsableBreakpoint(
					currentBreakpoint,
					breakpoint =>
						Object.prototype.hasOwnProperty.call(
							effects,
							`transition-${prop}-${breakpoint}`
						)
				)}`
			];

		return this.effects.reduce((promise, effects) => {
			const transitionDuration = getTransitionValue(effects, 'duration');
			const transitionDelay = getTransitionValue(effects, 'delay');
			const transitionTimeout =
				(transitionDuration + transitionDelay) * 1000;

			return Math.max(promise, transitionTimeout);
		}, 0);
	}

	/**
	 * Generates a clean CSS and Effect object to be used to generate styles
	 * and transition strings.
	 */
	generateCssResponsiveObj() {
		const getCssObjForEachTarget = (css, effects) => {
			const stylesObj = {};
			const effectsObj = {};

			const getLastEffectsBreakpointAttribute = (
				target,
				currentBreakpoint
			) => {
				const lastBreakpoint = this.getLastUsableBreakpoint(
					currentBreakpoint,
					breakpoint =>
						Object.prototype.hasOwnProperty.call(
							effects,
							`${target}-${breakpoint}`
						)
				);

				return {
					[target]:
						effects[`${target}-${lastBreakpoint ?? 'general'}`],
				};
			};

			this.breakpoints.forEach(breakpoint => {
				const hasCSS = Object.prototype.hasOwnProperty.call(
					css,
					breakpoint
				);

				if (hasCSS)
					stylesObj[breakpoint] = { ...css[breakpoint].styles };

				effectsObj[breakpoint] = {
					...getLastEffectsBreakpointAttribute(
						'transition-status',
						breakpoint
					),
					...getLastEffectsBreakpointAttribute(
						'transition-duration',
						breakpoint
					),
					...getLastEffectsBreakpointAttribute(
						'transition-delay',
						breakpoint
					),
					...getLastEffectsBreakpointAttribute('easing', breakpoint),
				};
			});

			return { stylesObj, effectsObj };
		};

		const cleanValues = obj => {
			const response = { ...obj };

			// Clean values
			Object.entries(response).forEach(([key, value]) => {
				[...this.breakpoints]
					.reverse()
					.reduce((prevBreakpoint, breakpoint) => {
						const doesExist = Object.prototype.hasOwnProperty.call(
							value,
							prevBreakpoint
						);

						if (!doesExist) return breakpoint;

						const isEmpty =
							Object.keys(value[prevBreakpoint]).length === 0;
						const isEqualThanPrevious =
							JSON.stringify(value[breakpoint]) ===
							JSON.stringify(value[prevBreakpoint]);

						if (isEmpty || isEqualThanPrevious)
							delete response[key][prevBreakpoint];

						return breakpoint;
					});
			});

			return response;
		};

		const stylesObjs = [];
		const effectsObjs = [];

		const pushStylesAndEffects = ({ stylesObj, effectsObj }) => {
			const isEmptyObject = obj => Object.keys(obj).length === 0;

			if (!isEmptyObject(stylesObj)) stylesObjs.push(stylesObj);
			if (!isEmptyObject(effectsObj)) effectsObjs.push(effectsObj);
		};

		this.css.forEach((css, index) => {
			if (this.hasMultipleTargetsArray[index]) {
				const stylesObj = {};
				// effectsObj is the same for all targets
				let effectsObj = {};

				Object.keys(css).forEach(target => {
					const { stylesObj: rawStylesObj, effectsObj: rawEffects } =
						cleanValues(
							getCssObjForEachTarget(
								css[target],
								this.effects[index]
							)
						);

					stylesObj[target] = rawStylesObj;
					effectsObj = rawEffects;
				});

				pushStylesAndEffects({ stylesObj, effectsObj });
			} else {
				pushStylesAndEffects(
					cleanValues(
						getCssObjForEachTarget(css, this.effects[index])
					)
				);
			}
		});

		return {
			stylesObjs,
			effectsObjs,
		};
	}

	generateBreakpointsObj() {
		const breakpointsObj = {};

		const getBreakpointValues = css => {
			this.breakpoints.forEach(breakpoint => {
				if (
					Object.prototype.hasOwnProperty.call(css, breakpoint) &&
					(breakpoint !== 'xxl' ||
						Object.prototype.hasOwnProperty.call(css, 'xl'))
				) {
					let { breakpoint: breakpointValue } = css[breakpoint];

					breakpointValue =
						breakpoint === 'general' ? '' : breakpointValue;
					breakpointValue =
						breakpoint === 'xxl'
							? css.xl.breakpoint
							: breakpointValue;

					breakpointsObj[breakpoint] = breakpointValue;
				}
			});
		};

		this.css.forEach((css, index) => {
			if (this.hasMultipleTargetsArray[index]) {
				Object.keys(css).forEach(target => {
					getBreakpointValues(css[target]);
				});
			} else getBreakpointValues(css);
		});

		return breakpointsObj;
	}

	escapeRegExp(string) {
		return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	}

	getAvoidHover() {
		if (!this.hoverStatus || !this.targetEl) return;

		this.transitionTargetsArray.forEach(transitionTargets =>
			this.avoidHoverArray.push(
				transitionTargets.some(transitionTarget =>
					Array.from(
						document.querySelectorAll(
							`${this.fullTarget} ${
								this.fullTarget.includes(transitionTarget)
									? ''
									: transitionTarget
							}`
						)
					).some(
						element =>
							this.targetEl
								.closest('.maxi-block')
								.contains(element) &&
							this.targetEl.contains(element)
					)
				)
			)
		);
	}

	setDataAttrToBlock(value) {
		// On setting the 'false' value, is necessary to check the 'data-maxi-relations-trigger'
		// to ensure the last trigger is not removed. It happens when moving from some trigger to
		// other really fast between while `transitionTimeout` is still running.
		if (value === 'false') {
			const currentTrigger = this.blockTargetEl.getAttribute(
				'data-maxi-relations-trigger'
			);

			if (currentTrigger === this.trigger || !currentTrigger)
				this.blockTargetEl.setAttribute('data-maxi-relations', value);
		} else this.blockTargetEl.setAttribute('data-maxi-relations', value);

		this.blockTargetEl.setAttribute(
			'data-maxi-relations-trigger',
			this.trigger
		);
	}

	addDataAttrToBlock() {
		this.setDataAttrToBlock('true');
	}

	removeAddAttrToBlock() {
		this.setDataAttrToBlock('false');
	}

	// Target for the creation of styles and transition lines needs to be considered
	// as it can create higher specificity than the default block styles.
	getTargetForLine(transitionTarget, mainTarget = this.dataTarget) {
		if (transitionTarget)
			if (!mainTarget.includes(transitionTarget))
				return `${mainTarget} ${transitionTarget}`;
			else return mainTarget;

		return `${mainTarget} ${this.target}`;
	}

	getMediaLines(breakpoint, breakpointValue) {
		let prevLine = '';
		let postLine = '';

		if (breakpoint === 'general') return { prevLine, postLine };

		const mediaRule = breakpoint === 'xxl' ? 'min-width' : 'max-width';
		const mediaValue =
			breakpoint === 'xxl' ? breakpointValue + 1 : breakpointValue;

		prevLine = `@media screen and (${mediaRule}: ${mediaValue}px) {`;
		postLine = '}';

		return { prevLine, postLine };
	}

	generateStyles() {
		const getStylesLine = (stylesObj, target, index) => {
			const isBackground = target.includes('maxi-background-displayer');

			Object.entries(this.breakpointsObj).forEach(
				([breakpoint, breakpointValue]) => {
					if (stylesObj[breakpoint]) {
						// Checks if the element needs special CSS to be avoided in case the element is hovered
						const avoidHoverString = this.avoidHoverArray[index]
							? ':not(:hover)'
							: '';

						const { prevLine, postLine } = this.getMediaLines(
							breakpoint,
							breakpointValue
						);

						const selector =
							`${prevLine} body.maxi-blocks--active ${
								this.isSVG
									? target.replace(
											'maxi-svg-icon-block__icon',
											match =>
												`${match}${avoidHoverString}`
									  )
									: `${target.trim()}${avoidHoverString}`
							} {`.replace(/\s{2,}/g, ' ');

						Object.entries(stylesObj[breakpoint]).forEach(
							([key, value]) => {
								const selectorRegExp = new RegExp(
									`(${this.escapeRegExp(selector)})`
								);
								if (!this.stylesString.match(selectorRegExp))
									this.stylesString += `${selector}}${postLine}`;

								this.stylesString = this.stylesString.replace(
									selectorRegExp,
									`$1 ${key}: ${value};`
								);
							}
						);

						if (this.isBorderArray[index] && isBackground) {
							const getBorderValue = target =>
								this.attributes[
									`border-${target}-width-${breakpoint}`
								];

							const widthTop = getBorderValue('top');
							const widthRight = getBorderValue('right');
							const widthBottom = getBorderValue('bottom');
							const widthLeft = getBorderValue('left');
							const widthUnit =
								this.attributes[`border-unit-${breakpoint}`] ||
								'px';

							// Rounds to 2 decimals
							const roundNumber = number =>
								Math.round(number * 100) / 100;

							const selectorRegExp = new RegExp(
								`(${this.escapeRegExp(selector)})`
							);
							if (!this.stylesString.match(selectorRegExp))
								this.stylesString += `${selector}}${postLine}`;

							if (widthTop || widthTop === 0)
								this.stylesString = this.stylesString.replace(
									selectorRegExp,
									`$1 top: -${roundNumber(
										widthTop
									)}${widthUnit};`
								);
							if (widthBottom || widthBottom === 0)
								this.stylesString = this.stylesString.replace(
									selectorRegExp,
									`$1 bottom: -${roundNumber(
										widthBottom
									)}${widthUnit};`
								);
							if (widthLeft || widthLeft === 0)
								this.stylesString = this.stylesString.replace(
									selectorRegExp,
									`$1 left: -${roundNumber(
										widthLeft
									)}${widthUnit};`
								);
							if (widthRight || widthRight === 0)
								this.stylesString = this.stylesString.replace(
									selectorRegExp,
									`$1 right: -${roundNumber(
										widthRight
									)}${widthUnit};`
								);
						}
					}
				}
			);
		};

		// On styles (not transitions), we need to keep the styles after run the interaction.
		// As the same target block can be used by multiple interactions, we can't depend the styles
		// on the "data-relations" attribute, as it can be changed by other interactions.
		// To prevent it, in case the interaction is 'click' type, the target don't contains
		// the "data-relations" attribute, so we can keep the styles after the interaction.
		const mainTarget =
			this.action === 'click' ? `#${this.uniqueID}` : this.dataTarget;

		this.stylesObjs.forEach((stylesObj, index) => {
			if (this.hasMultipleTargetsArray[index])
				Object.entries(stylesObj).forEach(
					([targetSelector, styles]) =>
						Object.keys(styles).length &&
						getStylesLine(
							styles,
							`${mainTarget} ${targetSelector}`,
							index
						)
				);
			else
				this.transitionTargetsArray[index].forEach(transitionTarget =>
					getStylesLine(
						stylesObj,
						this.getTargetForLine(
							transitionTarget,
							this.action === 'click'
								? `#${this.uniqueID}`
								: this.dataTarget
						),
						index
					)
				);
		});
	}

	addStyles() {
		this.addStyleEl(this.stylesEl);
	}

	removeStyles() {
		this.stylesEl.remove();
	}

	generateTransitions() {
		const getTransitionLine = (stylesObj, target, index) => {
			const isBackground = target.includes('maxi-background-displayer');

			Object.entries(this.breakpointsObj).forEach(
				([breakpoint, breakpointValue]) => {
					if (this.effectsObjs[index][breakpoint]) {
						const { prevLine, postLine } = this.getMediaLines(
							breakpoint,
							breakpointValue
						);

						const selector =
							`${prevLine}body.maxi-blocks--active ${target} {`.replace(
								/\s{2,}/g,
								' '
							);

						let currentStyleObj =
							stylesObj[
								this.getLastUsableBreakpoint(
									breakpoint,
									breakpoint =>
										stylesObj?.[breakpoint] &&
										Object.keys(stylesObj?.[breakpoint])
											.length
								)
							];

						if (this.isBorder && isBackground)
							currentStyleObj = {
								...currentStyleObj,
								top: null,
								left: null,
							};

						if (currentStyleObj) {
							const transitionString = this.getTransitionString(
								currentStyleObj,
								this.effectsObjs[index][breakpoint],
								this.isIconArray[index]
							);

							const selectorRegExp = new RegExp(
								`(${this.escapeRegExp(selector)})`
							);
							if (!this.transitionString.match(selectorRegExp))
								this.transitionString += `${selector}}${postLine}`;

							const transitionExistsRegExp = new RegExp(
								`(${this.escapeRegExp(
									selector
								)}[^{]*transition:)`
							);
							if (!transitionString) return;

							if (
								this.transitionString.match(
									transitionExistsRegExp
								)
							) {
								if (!this.isIconArray[index])
									this.transitionString =
										this.transitionString.replace(
											transitionExistsRegExp,
											`$1 ${transitionString}`
										);
							} else {
								this.transitionString =
									this.transitionString.replace(
										selectorRegExp,
										`$1 transition: ${transitionString.replace(
											/, $/,
											''
										)};`
									);
							}
						}
					}
				}
			);
		};

		this.stylesObjs.forEach((stylesObj, index) => {
			if (this.hasMultipleTargetsArray[index]) {
				if (!this.isSVG)
					Object.keys(stylesObj).forEach(targetSelector => {
						getTransitionLine(
							stylesObj[targetSelector],
							`${this.dataTarget} ${targetSelector}`,
							index
						);
					});
				else
					this.transitionTargetsArray[index].forEach(
						transitionTarget => {
							// Checks if the element needs special CSS to be avoided in case the element is hovered
							const svgTarget = `${this.dataTarget} ${
								this.avoidHoverArray[index]
									? transitionTarget.replace(
											'maxi-svg-icon-block__icon',
											match => `${match}:not(:hover)`
									  )
									: transitionTarget
							}`;

							Object.keys(stylesObj).forEach(targetSelector =>
								getTransitionLine(
									stylesObj[targetSelector],
									svgTarget,
									index
								)
							);
						}
					);
			} else
				this.transitionTargetsArray[index].forEach(transitionTarget =>
					getTransitionLine(
						stylesObj,
						this.getTargetForLine(transitionTarget),
						index
					)
				);
		});
	}

	addTransition() {
		this.addStyleEl(this.transitionEl);
	}

	removeTransition() {
		this.transitionEl.remove();
	}

	getTransitionString(styleObj, effectsObj, isIcon) {
		const {
			'transition-status': status,
			'transition-duration': duration,
			'transition-delay': delay,
			easing,
		} = effectsObj;

		const transitionPropertiesString = `${
			status ? `${duration}s ${easing} ${delay}s` : '0s 0s'
		}, `;

		const transitionString = isIcon
			? `all ${transitionPropertiesString}`
			: Object.keys(styleObj).reduce(
					(transitionString, style) =>
						`${transitionString}${style} ${transitionPropertiesString}`,
					''
			  );

		if (
			this.defaultTransition !== 'none 0s ease 0s' &&
			!transitionString.includes(this.defaultTransition)
		) {
			return `${this.defaultTransition}, ${transitionString}`;
		}
		return transitionString;
	}

	init() {
		switch (this.action) {
			case 'hover':
				this.addHoverEvents();
				break;
			case 'click':
			default:
				this.addClickEvents();
				break;
		}
	}

	addHoverEvents() {
		this.triggerEl.addEventListener(
			'mouseenter',
			this.onMouseEnter.bind(this)
		);
		this.triggerEl.addEventListener(
			'mouseleave',
			this.onMouseLeave.bind(this)
		);

		/**
		 * In case the target element is nested inside the trigger element, we need to ensure the original hover transition
		 * works correctly on hovering. It means, we need to remove the transitions added by the trigger when hovering the target
		 * to ensure it has the selected effects
		 */
		if (this.isHoveredContained) {
			this.transitionTriggerEls.forEach(transitionTriggerEl => {
				transitionTriggerEl.addEventListener('mouseenter', () => {
					// console.log('Entering hover target'); // 🔥

					// Remove transitions to let the original ones be applied
					this.removeTransition();

					clearTimeout(this.contentTimeout);
				});

				transitionTriggerEl.addEventListener('mouseleave', () => {
					const transitionDuration = Array.from(
						new Set(this.transitionTargetsArray.flat())
					).reduce((promise, transitionTarget) => {
						const transitionTargetEl = document.querySelector(
							`${this.dataTarget} ${transitionTarget ?? ''}`
						);

						const transitionDuration = transitionTargetEl
							? [
									'transition-duration',
									'transition-delay',
							  ].reduce(
									(sum, prop) =>
										sum +
										parseFloat(
											getComputedStyle(transitionTargetEl)
												.getPropertyValue(prop)
												.replace('s', '')
										),
									0
							  ) * 1000
							: 0;

						return Math.max(promise, transitionDuration);
					}, 0);

					// console.log('Leaving hover target'); // 🔥

					this.contentTimeout = setTimeout(() => {
						// Set the transitions back waiting the original to be done
						this.addTransition();
					}, transitionDuration);
				});
			});
		}
	}

	onMouseEnter() {
		// console.log('IB is active'); // 🔥
		clearTimeout(this.transitionTimeout);

		this.addDataAttrToBlock();
		this.addTransition();
		this.addStyles();
	}

	onMouseLeave() {
		// console.log('IB is inactive'); // 🔥
		if (this.isContained) this.addTransition();

		this.removeStyles();

		// If the targeted element is hovered and the element has a transition set, remove transitions immediately
		if (
			this.targetEl.matches(':hover') &&
			this.defaultTransition !== 'none 0s ease 0s'
		) {
			this.removeTransition();
			this.removeAddAttrToBlock();
		} else {
			this.transitionTimeout = setTimeout(() => {
				this.removeTransition();
				this.removeAddAttrToBlock();
			}, this.getTransitionTimeout());
		}
	}

	addClickEvents() {
		this.triggerEl.addEventListener('click', this.onMouseClick.bind(this));
	}

	onMouseClick() {
		this.addDataAttrToBlock();
		this.addTransition();
		this.addStyles();

		this.transitionTimeout = setTimeout(() => {
			this.removeTransition();
		}, this.getTransitionTimeout());
	}
}

window.addEventListener('load', () => {
	// eslint-disable-next-line no-undef
	const relations = maxiRelations?.[0];
	if (!relations) return;

	const uniqueRelations = relations.reduce(
		(uniqueArray, { action, trigger, uniqueID, target }) => {
			const getIsUnique = relation =>
				relation.action === action &&
				relation.trigger === trigger &&
				relation.uniqueID === uniqueID &&
				relation.target === target;

			const isUnique = !uniqueArray.find(uniqueRelation =>
				getIsUnique(uniqueRelation)
			);
			if (isUnique) {
				const sameRelations = relations.filter(sameRelation =>
					getIsUnique(sameRelation)
				);
				const mergedSameRelations = sameRelations.reduce(
					(obj, relation) => {
						Object.keys(relation).forEach(key => {
							if (
								key !== 'action' &&
								key !== 'trigger' &&
								key !== 'uniqueID' &&
								key !== 'target'
							) {
								if (!obj[key]) obj[key] = [];
								obj[key].push(relation[key]);
							} else {
								obj[key] = relation[key];
							}
						});
						return obj;
					},
					{}
				);
				uniqueArray.push(mergedSameRelations);
			}

			return uniqueArray;
		},
		[]
	);

	uniqueRelations.forEach(relation => new Relation(relation));
});
