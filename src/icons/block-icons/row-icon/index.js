/**
 * WordPress dependencies
 */
const { SVG, Path } = wp.primitives;

const textIcon = (
	<SVG xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
		<Path
			fill='none'
			stroke='#ff4a17'
			strokeLinecap='round'
			strokeLinejoin='round'
			d='M16.6 1.3H23v21.5h-6.4V1.3zM1 1.3h6.4v21.5H1V1.3zm7.9 0h6.4v21.5H8.9V1.3z'
		/>
	</SVG>
);

export default textIcon;
