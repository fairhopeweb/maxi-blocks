/**
 * WordPress dependencies
 */
const { SVG, Path } = wp.primitives;

const paintBrush = (
    <SVG viewBox="0 0 24 24">
        <Path
            d="M15.9 1.5l-.1-.1c-.5-.5-1-.8-1.4-.8-.4 0-.7.2-1 .5L5.7 8.8c-.3.3-.4.6-.4 1s.1.8.4 1.1l1.7 1.6c.1.1.1.2.1.3.1.1.1.2.1.3 0 .1 0 .2-.1.3-.1.1-.1.2-.2.2l-4.5 3c-.5.3-.8.6-1 .8-.7.7-1 1.5-1 2.4 0 1 .3 1.8 1 2.5s1.5 1 2.4 1c1 0 1.8-.4 2.5-1 .2-.2.4-.5.8-1l3-4.5c.1-.1.1-.2.3-.3.1 0 .2-.1.3-.1.1 0 .2 0 .3.1.1 0 .2.1.3.1l1.7 1.6c.3.3.6.5 1.1.5.4 0 .8-.1 1-.5l7.7-7.6c.3-.3.4-.7.4-1.1 0-.3-.1-.5-.2-.7 0-.1-.1-.2-.1-.2l-.1-.1-1.2-.8-4.9 3.3H17s-.1 0-.1-.1l-.1-.1s0-.1.1-.1l3.3-4.8-2.5-2.4-1.9.9h-.1s-.1 0-.1-.1l-.1-.1v-.1l.9-1.9-.5-.7zM4.3 18.7c.2 0 .4.1.6.3s.3.4.3.6c0 .2-.1.4-.3.6s-.4.3-.6.3c-.3 0-.5-.1-.6-.3-.2-.2-.3-.4-.3-.6 0-.3.1-.5.3-.6.2-.2.4-.3.6-.3zm12.1-3.8L9 7.6"
            fill="none"
            stroke="#0cf"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </SVG>
)

export default paintBrush;