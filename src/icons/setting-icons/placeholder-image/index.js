/**
 * WordPress dependencies
 */
const { SVG, Path } = wp.primitives;

const placeholderImage = (
    <SVG preserveAspectRatio="none" x="0px" y="0px" width="600px" height="400px" viewBox="0 0 600 400">
        <defs>
            <g id="Layer0_0_FILL">
                <Path fill="#F2F2F2" stroke="none" d="M 50.75 50.95L 48.3 51.8 46.05 399.5 553.15 399.5 553.15 47.95 297.4 250.7 50.75 50.95M 320.25 118.7Q 311.7 110.1 299.6 110.1 292.1 110.1 286 113.35 282.2 115.4 278.9 118.7 270.35 127.25 270.35 139.35 270.35 151.45 278.9 160.05 282.2 163.35 286 165.35 292.1 168.6 299.6 168.6 311.7 168.6 320.25 160.05 328.85 151.45 328.85 139.35 328.85 127.25 320.25 118.7 Z" />
                <Path fill="#FFFFFF" stroke="none" d="M -0.45 0.05L -0.45 399.5 46.05 399.5 48.3 51.8 50.75 50.95 297.4 250.7 553.15 47.95 553.15 399.5 600.5 399.5 600.5 0.05 -0.45 0.05M 299.6 110.1Q 311.7 110.1 320.25 118.7 328.85 127.25 328.85 139.35 328.85 151.45 320.25 160.05 311.7 168.6 299.6 168.6 292.1 168.6 286 165.35 282.2 163.35 278.9 160.05 270.35 151.45 270.35 139.35 270.35 127.25 278.9 118.7 282.2 115.4 286 113.35 292.1 110.1 299.6 110.1 Z" />
            </g>
        </defs>
        <g transform="matrix( 1, 0, 0, 1, 0,0) ">
            <use href="#Layer0_0_FILL" />
        </g>
    </SVG>
)

export default placeholderImage;