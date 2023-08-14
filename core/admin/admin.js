document.addEventListener('DOMContentLoaded', function maxiAdmin() {
	// &panel=documentation-support will open the tab in the accordion
	const urlStr = window.location.href;
	const url = new URL(urlStr);
	const toCheck = url.searchParams.get('panel');
	const checkBox = document.getElementById(toCheck);
	if (checkBox) checkBox.checked = true;

	// Hide the "Pro" tab if the user is not logged in
	const proDiv = document.getElementById('maxi-dashboard_main-content_pro');
	if (proDiv) proDiv.style.display = 'none';

	const notProDiv = document.getElementById(
		'maxi-dashboard_main-content_not-pro'
	);
	if (notProDiv) {
		notProDiv.style.display = 'block';
		document.getElementById(
			'maxi-dashboard_main-content_pro-not-pro'
		).style.display = 'block';
	}

	// save new breakpoints to the hidden input
	const inputs = document.getElementsByClassName(
		'maxi-dashboard_main-content_accordion-item-input'
	);

	const breakpointsInput = document.getElementById('maxi-breakpoints');

	if (inputs && breakpointsInput) {
		const breakpoints = breakpointsInput?.value;
		const breakpointsArray = JSON.parse(breakpoints);

		Array.from(inputs)?.forEach(input => {
			const inputId = input.id;
			const breakpoint = inputId.replace('maxi-breakpoint-', '');

			input.addEventListener('input', function updateBreakpoints() {
				const inputValue = input.value;
				breakpointsArray[breakpoint] = parseInt(inputValue);
				breakpointsInput.value = JSON.stringify(breakpointsArray);
			});
		});
	}

	const select = document.getElementById('maxi-versions');
	const version = document.getElementById('maxi-rollback-version');

	select?.addEventListener('change', function updateBreakpoints() {
		const { value } = select;
		version.value = value;
	});

	const dropdowns = document.querySelectorAll(
		'.maxi-dashboard_main-content_accordion-item-content-switcher__dropdown select'
	);

	if (dropdowns) {
		Array.from(dropdowns)?.forEach(dropdown => {
			const dropdownInput = document.querySelector(
				`input#${dropdown.id}`
			);

			dropdown.addEventListener('change', function updateInputs() {
				dropdownInput.value = dropdown.value;
			});
		});
	}

	// test map for google api key
	// Initialize and add the map
	const initTestMap = () => {
		// The location of Uluru
		const uluru = { lat: -25.344, lng: 131.031 };
		// The map, centered at Uluru
		const map = new google.maps.Map(
			document.getElementById('maxi-api-test'),
			{
				zoom: 4,
				center: uluru,
			}
		);
		// The marker, positioned at Uluru
		const marker = new google.maps.Marker({
			position: uluru,
			map,
		});
	};

	const customValidation = (
		type,
		getKey,
		hiddenInput,
		validationDiv,
		validationLoadingClass = 'api-validation-loading',
		errorClass = 'api-error',
		loadingStatusMessage = 'Validating...'
	) => {
		const key = getKey();
		let validationMessage = '';

		if (type === 'validating') {
			validationMessage = loadingStatusMessage;
			validationDiv.classList.add(validationLoadingClass);
			validationDiv.classList.remove(errorClass);
		} else {
			validationDiv.classList.remove(validationLoadingClass);

			if (key === '' || type === 'EmptyKeyError') {
				hiddenInput.value = '';
				validationDiv.classList.add(errorClass);
				validationMessage = 'Please add your API key';
			} else {
				validationDiv.classList.add(errorClass);
				switch (type) {
					case 'InvalidKeyError':
						validationMessage =
							'Invalid API Key, please check your key and try again';
						break;
					case 'RefererNotAllowedError':
						validationMessage =
							'Referer not allowed, please allow your domain for that key';
						break;
					case 'InvalidCharactersError':
						validationMessage =
							'Only alphabet, number, "_", "$", ".", "[", and "]" are allowed in the API key.';
						break;
					case 'ServerError':
						validationMessage =
							'Error validating API Key, please try again later';
						break;
					case true:
						hiddenInput.value = key;
						validationDiv.classList.remove(errorClass);
						break;
					default:
						break;
				}
			}
		}

		validationDiv.innerHTML = validationMessage;
	};

	// Google API Key validation
	const googleApiKeyVisibleInput = document.querySelector(
		'.google-api-key-option-visible-input'
	);
	const googleApiKeyHiddenInput = document.getElementById(
		'google_api_key_option'
	);
	const googleValidationDiv = document.getElementById(
		'maxi-api-test__validation-message'
	);

	const head = document.getElementsByTagName('head')[0];

	const getGoogleApiKey = () => googleApiKeyVisibleInput.value;

	const checkForInvalidCharactersError = googleApiKey =>
		!googleApiKey.match(/^[a-zA-Z0-9_$.[\]]+$/);

	const googleMapsCustomValidation = type => {
		customValidation(
			type,
			getGoogleApiKey,
			googleApiKeyHiddenInput,
			googleValidationDiv
		);
	};

	const testGoogleApiKey = () => {
		const googleApiKey = getGoogleApiKey();

		if (checkForInvalidCharactersError(googleApiKey)) {
			googleMapsCustomValidation('InvalidCharactersError');
			return;
		}

		const oldScript = document.getElementById(
			'maxi-test-google-map-script'
		);
		if (oldScript) head.removeChild(oldScript);

		const script = document.createElement('script');
		script.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&callback=initMap`;
		script.id = 'maxi-test-google-map-script';
		script.defer = true;
		script.async = true;

		head.appendChild(script);
		window.initMap = initTestMap;
		googleValidationDiv.innerHTML = '';
		googleValidationDiv.classList.remove('api-error');
	};

	const catchGoogleMapsApiErrors = () => {
		// based on http://tobyho.com/2012/07/27/taking-over-console-log/
		const { console } = window;
		if (!console) return;

		const intercept = method => {
			const original = console[method];
			console[method] = function () {
				if (arguments[0]) {
					if (
						arguments[0].includes('InvalidKeyMapError') ||
						arguments[0].includes('API multiple times')
					) {
						googleMapsCustomValidation('InvalidKeyError');
					} else if (
						arguments[0].includes('RefererNotAllowedMapError')
					) {
						googleMapsCustomValidation('RefererNotAllowedError');
					} else if (arguments[0].includes('API without a key')) {
						googleMapsCustomValidation('EmptyKeyError');
					} else {
						googleMapsCustomValidation(true);
					}
				}

				if (original.apply) {
					original.apply(console, arguments);
				}
			};
		};
		intercept(['error']);
	};

	googleApiKeyVisibleInput?.addEventListener('input', function () {
		testGoogleApiKey();
		catchGoogleMapsApiErrors();
	});

	// OpenAI API Key validation
	const openAIApiKeyVisibleInput = document.querySelector(
		'.openai-api-key-option-visible-input'
	);
	const openAIApiKeyHiddenInput = document.getElementById(
		'openai_api_key_option'
	);
	const openAIValidationDiv = document.getElementById(
		'maxi-api-test__validation-message'
	);

	const getOpenAIApiKey = () => openAIApiKeyVisibleInput.value;

	const openAIApiKeyCustomValidation = type => {
		customValidation(
			type,
			getOpenAIApiKey,
			openAIApiKeyHiddenInput,
			openAIValidationDiv
		);
	};

	const testOpenAIApiKey = () => {
		const openAIApiKey = getOpenAIApiKey();

		if (openAIApiKey === '') {
			openAIApiKeyCustomValidation(''); // Handle empty input case here
			return;
		}

		openAIApiKeyCustomValidation('validating');

		fetch('https://api.openai.com/v1/chat/completions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${openAIApiKey}`,
			},
			body: JSON.stringify({
				messages: [
					{
						role: 'user',
						content: 'Hello',
					},
				],
				model: 'gpt-3.5-turbo',
				max_tokens: 1,
			}),
		})
			.then(response => {
				if (response.ok) {
					openAIApiKeyCustomValidation(true);
				} else {
					openAIApiKeyCustomValidation('InvalidKeyError');
				}
			})
			.catch(error => {
				console.error(error);
				openAIApiKeyCustomValidation('ServerError');
			});
	};

	openAIApiKeyVisibleInput?.addEventListener('input', function () {
		testOpenAIApiKey();
	});
});
