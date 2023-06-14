<?php

function get_circle_bar_styles($obj, $blockStyle)
{
    $response = [
        'label' => 'Number Counter',
        'general' => []
    ];

    $get_color = function ($breakpoint) use ($obj, $blockStyle) {
        $palette = get_palette_attributes([
            'obj' => $obj,
            'prefix' => 'number-counter-circle-bar-',
            'breakpoint' => $breakpoint
        ]);

        if ((!isset($palette['paletteStatus']) || !$palette['paletteStatus']) && isset($palette['color'])) {
            return $palette['color'];
        }

        if (isset($palette['paletteStatus']) && $palette['paletteStatus'] && isset($palette['paletteColor'])) {
            return get_color_rgba_string(
                "color-{$palette['paletteColor']}",
                $palette['paletteOpacity'],
                $blockStyle
            );
        }
    };

    $breakpoints = ['general', 'xxl', 'xl', 'l', 'm', 's', 'xs'];

    foreach ($breakpoints as $breakpoint) {
        $response[$breakpoint] = [
            'stroke' => $get_color($breakpoint)
        ];
    }

    return ['numberCounterCircleBar' => $response];
}

function get_circle_background_styles($obj, $blockStyle)
{
    $response = [
        'label' => 'Number Counter',
        'general' => []
    ];

    $palette = get_palette_attributes([
        'obj' => $obj,
        'prefix' => 'number-counter-circle-background-'
    ]);

    if ((!isset($palette['paletteStatus']) || !$palette['paletteStatus']) && isset($palette['color'])) {
        $response['general']['stroke'] = $palette['color'];
    } elseif (isset($palette['paletteStatus']) && $palette['paletteStatus'] && isset($palette['paletteColor'])) {
        $response['general']['stroke'] = get_color_rgba_string(
            "color-{$palette['paletteColor']}",
            $palette['paletteOpacity'],
            $blockStyle
        );
    }

    return ['numberCounterBackground' => $response];
}

function get_text_styles($obj, $blockStyle)
{
    $response = [
        'label' => 'Number Counter',
        'general' => []
    ];

    $get_color = function ($breakpoint) use ($obj, $blockStyle) {
        $palette = get_palette_attributes([
            'obj' => $obj,
            'prefix' => 'number-counter-text-',
            'breakpoint' => $breakpoint
        ]);

        if ((!isset($palette['paletteStatus']) || !$palette['paletteStatus']) && isset($palette['color'])) {
            return $palette['color'];
        }

        if (isset($palette['paletteStatus']) && $palette['paletteStatus'] && isset($palette['paletteColor'])) {
            return get_color_rgba_string(
                "color-{$palette['paletteColor']}",
                $palette['paletteOpacity'],
                $blockStyle
            );
        }
    };

    $breakpoints = ['general', 'xxl', 'xl', 'l', 'm', 's', 'xs'];

    foreach ($breakpoints as $breakpoint) {
        $response[$breakpoint] = [
            ...(!isset($obj["number-counter-title-font-size-{$breakpoint}"]) ? [] : ['font-size' => "{$obj["number-counter-title-font-size-{$breakpoint}"]}px"]),
            ...(!isset($obj["font-family-{$breakpoint}"]) ? [] : ['font-family' => $obj["font-family-{$breakpoint}"]]),
            ...(!isset($obj["font-weight-{$breakpoint}"]) ? [] : ['font-weight' => $obj["font-weight-{$breakpoint}"]]),
            'color' => $get_color($breakpoint)
        ];
    }

    return ['numberCounterText' => $response];
}

function get_sup_styles($obj)
{
    $response = [
        'label' => 'Number Counter',
        'general' => []
    ];

    $breakpoints = ['general', 'xxl', 'xl', 'l', 'm', 's', 'xs'];

    foreach ($breakpoints as $breakpoint) {
        if (isset($obj["number-counter-title-font-size-{$breakpoint}"])) {
            $val = $obj["number-counter-title-font-size-{$breakpoint}"];
            $use_val = round((float)$val/1.5, 2);

            $response['general']['font-size'] =  $use_val.'px';
        }
    }

    return ['numberCounterSup' => $response];
}

function get_number_counter_styles($obj, $target, $blockStyle)
{
    $response = [
        " {$target} .maxi-number-counter__box__circle" => get_circle_bar_styles($obj, $blockStyle),
        " {$target} .maxi-number-counter__box__background" => get_circle_background_styles($obj, $blockStyle),
        " {$target} .maxi-number-counter__box__text" => get_text_styles($obj, $blockStyle),
        " {$target} .maxi-number-counter__box__text tspan" => get_sup_styles($obj)
    ];

    return $response;
}
