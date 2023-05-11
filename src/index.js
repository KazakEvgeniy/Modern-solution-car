'use strict';

import './index.html';
import './pages/marketing.html';
import './pages/accounting.html';
import './pages/spares.html';
import './pages/stock.html';
import './pages/purchase.html';
import './pages/delivery.html';
import './pages/analytics.html';
import './index.scss';
import './modules/sendForm';
import Swiper from 'swiper/bundle';
import SwiperCore, { Navigation, Pagination } from 'swiper/core';
import { sendForm } from './modules/sendForm';



document.addEventListener('DOMContentLoaded', (e) => {
	e.preventDefault();

	sendForm();


	const menu = document.querySelector('.menu'),
		headerContacts = document.querySelector('.header__contacts'),
		menuList = document.querySelector('.menu__list'),
		menuListLink = document.querySelectorAll('.menu__list-link'),
		headerWrapper = document.querySelector('.header__wrapper'),
		header = document.querySelector('.header'),
		menuBurger = document.querySelector('.menu-burger');



	function headerMobile() { //скрывает/показывает меню при клике
		menuList.classList.toggle('header-mobile--menu');
	};

	function hideTopMenuOnScroll() { //скрывает меню при скролле
		header.classList.remove('header--top');
		headerWrapper.classList.add('header__wrapper--line');
		menuListLink.forEach(link => link.classList.remove('menu__list-link--size'));
		menu.classList.remove('menu--top');
		headerContacts.classList.remove('header__contacts--top');
		menuList.classList.remove('menu__list--top');
	}

	function showTopMenuOnScroll() { // показываеет основное меню в статике
		header.classList.add('header--top');
		headerWrapper.classList.remove('header__wrapper--line');
		menu.classList.add('menu--top');
		headerContacts.classList.add('header__contacts--top');
		menuList.classList.add('menu__list--top');
		menuListLink.forEach(link => link.classList.add('menu__list-link--size'));
	}


	menuBurger.addEventListener('click', () => {
		headerMobile();
	});

	menuListLink.forEach((item) => {

		item.addEventListener('click', () => {
			headerMobile();
		})

	});


	if (header.classList.contains('header--hide-top')) {
		header.classList.add('header--top');
		headerWrapper.classList.remove('header__wrapper--line');
		menu.classList.add('menu--top');
		menuList.classList.add('menu__list--top');
		menuListLink.forEach(link => link.classList.add('menu__list-link--size'));
	} else {
		window.addEventListener('scroll', () => {
			const scroll = window.pageYOffset;
			if (scroll === 0) {
				hideTopMenuOnScroll();
			} else {

				showTopMenuOnScroll();
			}

		});
	}







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


