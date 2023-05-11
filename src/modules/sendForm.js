import spinner from '../img/modal/spinner.svg';

export function sendForm() {

	const btns = document.querySelectorAll('[data-modal="modal"]'),
		modal = document.querySelector('.modal'),
		closeModal = document.querySelector('.form__close'),
		formTitle = document.querySelector('.form__title');

	btns.forEach(btn => {
		btn.addEventListener('click', (e) => {
			const target = e.target;
			formTitle.innerText = target.innerText;
			modal.classList.add('show');
			modal.classList.remove('hide');

		});

	});




	modal.addEventListener('click', (e) => {
		if (e.target === modal) {
			closeModalWindow();
		}
	});


	closeModal.addEventListener('click', closeModalWindow);


	document.addEventListener('keydown', (e) => {

		if (e.code === 'Escape' && modal.classList.contains('show')) {
			closeModalWindow();
		}
	});



	function closeModalWindow() {
		modal.classList.add('hide');
		modal.classList.remove('show');
	}

	function openModal() {
		modal.classList.add('show');
		modal.classList.remove('hide');

	}



	// Сообщения формы

	const message = {
		loading: `${spinner}`,
		success: 'Спасибо!Скоро мы с вами свяжемся...',
		failure: 'Ошибка,попробуйте еще раз..'

	};

	const form = document.querySelectorAll('.form');

	form.forEach(item => {
		postData(item);
	});

	// POST данных

	function postData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();

			const spinner = document.createElement('img');
			spinner.classList.add('spinner');
			spinner.src = message.loading;
			spinner.style.cssText = `
				display:block;
				margin:0 auto;
		  `;
			form.insertAdjacentElement('afterend', spinner);


			const formData = new FormData(form);
			const object = {};

			formData.forEach((item, key) => {
				object[key] = item;
			});


			fetch('server.php', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json'
				},
				body: JSON.stringify(object),
			}).then((data) => {
				if (!data.ok) {
					showThancsModal(message.failure);
					openModal();
					throw new Error(`status ${data.status}`);
				} else {
					showThancsModal(message.success);
					setTimeout(() => {
						closeModalWindow();
					}, 2000);
				}
				spinner.remove();
			}).catch(() => {
				openModal();
				spinner.remove();
			}).finally(() => {
				form.reset();
			});

		});
	}

	function showThancsModal(message) {
		const prevModalDialog = document.querySelector('.modal__dialog');

		prevModalDialog.classList.add('hide');
		openModal();

		const thancsModal = document.createElement('div');
		thancsModal.classList.add('modal__dialog');

		thancsModal.innerHTML = `
		<div class="modal__content">
			<form action="#">
				<div class="form__message">${message}</div>
			</form>
		</div>
	`;

		document.querySelector('.modal').append(thancsModal);

		setTimeout(() => {
			thancsModal.remove();
			prevModalDialog.classList.add('show');
			prevModalDialog.classList.remove('hide');
		}, 2000);

	}

}

