/**
 * Internal dependencies
 */
import { MaxiBlock, getMaxiBlockAttributes } from '../../components/maxi-block';

/**
 * Save
 */
const save = props => {
	const { attributes } = props;
	const { uniqueID, styleID } = attributes;

	const classes = 'maxi-map-block';

	return (
		<MaxiBlock.save
			className={classes}
			id={uniqueID}
			{...getMaxiBlockAttributes(props)}
			data-maxi-style-id={styleID}
		>
			<div
				className='maxi-map-block__container'
				id={`maxi-map-block__container-${uniqueID}`}
			/>
		</MaxiBlock.save>
	);
};

export default save;
