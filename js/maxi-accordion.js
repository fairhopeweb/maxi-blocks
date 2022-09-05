class Accordion {
	constructor(el) {
		this.openPanes = [];
		this.accordion = el;
		this.uniqueID = el.id;
		({
			paneIcon: this.paneIcon,
			paneIconActive: this.paneIconActive,
			accordionLayout: this.accordionLayout,
			autoPaneClose: this.autoPaneClose,
			isCollapsible: this.isCollapsible,
		} = maxiAccordion[0][this.uniqueID]);
		this.panes = Array.from(
			el.querySelectorAll(':scope > .maxi-pane-block')
		);

		this.init();
	}

	init() {
		this.panes.forEach(pane => {
			const header = pane.querySelector(
				':scope > .maxi-pane-block__header'
			);
			const contentWrapper = pane.querySelector(
				':scope > .maxi-pane-block__content-wrapper'
			);
			header.addEventListener('click', this.paneClick.bind(this));
			header.querySelector('.maxi-pane-block__icon').innerHTML =
				this.paneIcon;
			contentWrapper.addEventListener('transitionend', e => {
				// Don't clear styles when child's transition ends
				if (e.target !== e.currentTarget) return;
				this.cleanAnimationStyles(contentWrapper);
			});
		});
	}

	cleanAnimationStyles(contentWrapper) {
		contentWrapper.style.overflow = null;
		contentWrapper.style.maxHeight = null;
	}

	triggerAnimation(pane, isClose = false) {
		const contentWrapper = pane.querySelector(
			'.maxi-pane-block__content-wrapper'
		);

		if (isClose) {
			contentWrapper.style.maxHeight = `${contentWrapper.scrollHeight}px`;
			setTimeout(() => {
				contentWrapper.style.maxHeight = 0;
			}, 0);
		} else {
			contentWrapper.style.overflow = 'hidden';
			contentWrapper.style.maxHeight = `${contentWrapper.scrollHeight}px`;
		}
		// If animationDuration === 0, the transitionend listener is not triggered,
		// so need to clear styles here
		if (this.animationDuration === 0) {
			this.cleanAnimationStyles(contentWrapper);
		}
	}

	closePane(pane) {
		this.triggerAnimation(pane, true);
		pane.setAttribute('aria-expanded', false);
		pane.querySelector('.maxi-pane-block__icon').innerHTML = this.paneIcon;
		this.openPanes.splice(this.openPanes.indexOf(pane.id), 1);
	}

	openPane(pane) {
		this.triggerAnimation(pane);
		pane.setAttribute('aria-expanded', true);
		pane.querySelector('.maxi-pane-block__icon').innerHTML =
			this.paneIconActive;

		if (this.autoPaneClose) {
			this.openPanes.forEach(id => {
				const pane = this.accordion.querySelector(`#${id}`);
				this.closePane.call(this, pane);
			});
		}
		this.openPanes.push(pane.id);
	}

	paneClick(e) {
		const pane = e.currentTarget.parentNode;

		if (this.openPanes.includes(pane.id)) {
			if (!this.isCollapsible && this.openPanes.length <= 1) return;
			this.closePane.call(this, pane);
		} else {
			this.openPane.call(this, pane);
		}
	}
}

document.addEventListener('DOMContentLoaded', () =>
	Array.from(document.querySelectorAll('.maxi-accordion-block')).forEach(
		el => new Accordion(el)
	)
);
