import './index.html';
import './index.scss';
import Swiper from 'swiper/bundle';
import SwiperCore, { Navigation, Pagination } from 'swiper/core';


window.addEventListener('DOMContentLoaded', (e) => {
	e.preventDefault();

	const menu = document.querySelector('.menu'),
		headerContacts = document.querySelector('.header__contacts'),
		menuList = document.querySelector('.menu__list'),
		menuListLink = document.querySelectorAll('.menu__list-link'),
		headerWrapper = document.querySelector('.header__wrapper'),
		header = document.querySelector('.header'),
		section = document.querySelectorAll('section[id]'),
		menuBurger = document.querySelector('.menu-burger'),
		menuListSocial = document.querySelector('.menu__list-item--social');

	const headerInner = document.querySelector('.header__inner');


	if (header.classList.contains('header--hide-top')) {
		hideTopMenuOnScroll();
	}


	function hideTopMenuOnScroll() {
		headerInner.append(menu);
		headerWrapper.classList.remove('header__wrapper--top', 'header__wrapper--line');
		menuList.classList.add('menu__list--top');
		headerContacts.style.display = 'none';
		header.classList.add('header--top');
		menuListLink.forEach(link => link.classList.add('menu__list-link--size'));
	}

	function showTopMenuOnScroll() {
		headerWrapper.after(menu);
		headerWrapper.classList.add('header__wrapper--top', 'header__wrapper--line');
		menuList.classList.remove('menu__list--top');
		headerContacts.style.display = 'flex';
		header.classList.remove('header--top');
		menuListLink.forEach(link => link.classList.remove('menu__list-link--size'));
	}

	window.addEventListener('scroll', () => {
		const scroll = window.pageYOffset;
		if (scroll === 0) {
			showTopMenuOnScroll()
		} else {
			hideTopMenuOnScroll();

		}

	});











	// cases-slide

	const casesList = document.querySelectorAll('.cases__list-item');

	const cases = new Swiper('.cases-slide', {
		slidesPerView: 1,
		centeredSlides: true,
		allowTouchMove: false,
		loop: true,
		autoplay: {
			delay: 2000,
		},
		pagination: {
			el: '.cases-pagination',
			type: 'bullets',
			clickable: true,
			renderBullet: function (index, className) {

				return `

					<li class="${className}">
					 ${casesList[index].innerHTML}
					</li>

			`

			},
		},


	})

	casesList.forEach(item => item.remove());

})