/**
 * WordPress dependencies
 */
const { SVG, Path } = wp.primitives;

const SvgComponent = (
	<SVG xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
		<Path
			fill='#fff'
			d='M2.9 23.5l.3-1.2c.3 0 .7 0 1.3-.1.5-.1 1-.1 1.3-.2.4-.1.7-.4 1-.6.2-.3.4-.6.5-1L11 4.3v-.6-.3c0-.5-.3-.8-.8-1.1C9.8 2 9 1.8 8 1.7L8.3.5h12.8l-.3 1.2c-.3 0-.8.1-1.3.2s-.9.2-1.2.3c-.4.1-.8.4-1 .7s-.4.6-.4 1L13.2 20c0 .2-.1.4-.1.5v.4c0 .5.3.9.8 1.1s1.3.4 2.3.5l-.3 1.2h-13v-.2z'
		/>
	</SVG>
);

export default SvgComponent;
