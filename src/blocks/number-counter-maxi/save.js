/**
 * Internal dependencies
 */
import MaxiBlock, {
	getMaxiBlockBlockAttributes,
} from '../../components/maxi-block';
import { getPaletteClasses } from '../../extensions/styles';

/**
 * Save
 */
const save = props => {
	const { attributes } = props;
	const { uniqueID, parentBlockStyle } = attributes;

	const classes = 'maxi-number-counter-block';

	const paletteClasses = getPaletteClasses(
		attributes,
		['typography', 'circle-background', 'circle-bar-background'],
		'maxi-blocks/number-counter-maxi',
		parentBlockStyle
	);

	const radius = attributes['number-counter-radius'];
	const stroke = attributes['number-counter-stroke'];
	const circleStatus = attributes['number-counter-circle-status'];
	const roundedStatus = attributes['number-counter-rounded-status'];

	return (
		<MaxiBlock
			className={classes}
			paletteClasses={paletteClasses}
			id={uniqueID}
			{...getMaxiBlockBlockAttributes(props)}
			isSave
		>
			<div
				className='maxi-number-counter__box'
				style={{
					width: `${radius + stroke / 2}px`,
				}}
			>
				{!circleStatus && (
					<svg
						viewBox={`0 0 ${radius * 2 + stroke} ${
							radius * 2 + stroke
						}`}
					>
						<circle
							className='maxi-number-counter__box__background'
							stroke-width={stroke}
							fill='none'
							cx={radius + stroke / 2}
							cy={radius + stroke / 2}
							r={radius}
						/>
						<circle
							className='maxi-number-counter__box__circle'
							stroke-width={stroke}
							fill='none'
							cx={radius + stroke / 2}
							cy={radius + stroke / 2}
							r={radius}
							stroke-linecap={roundedStatus ? 'round' : ''}
							stroke-dasharray={`0 ${2 * Math.PI * radius}`}
						/>
					</svg>
				)}
				<span className='maxi-number-counter__box__text'></span>
			</div>
		</MaxiBlock>
	);
};

export default save;
