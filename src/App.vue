<template>
  <div>
    <header class="header container">
      <div class="header__wrapper">
        <span class="header__info">Каталог</span>

        <a class="header__logo" href="#">
          <img src="img/svg/logo-moire.svg"
               alt="Логотип интернет магазина Moire" width="116" height="34">
        </a>

        <a class="header__tel" href="tel:8 800 600 90 09">
          8 800 600 90 09
        </a>

        <a class="header__cart" href="cart.html" aria-label="Корзина с товарами">
          <svg width="19" height="24">
            <use xlink:href="#icon-cart"></use>
          </svg>
          <span class="header__count" aria-label="Количество товаров">3</span>
        </a>
      </div>
    </header>

    <main class="content container">
      <div class="content__top">

        <div class="content__row">
          <h1 class="content__title">
            Каталог
          </h1>
          <span class="content__info">
          152 товара
        </span>
        </div>
      </div>

      <div class="content__catalog">
        <aside class="filter">
          <form class="filter__form form" action="#" method="get">
            <fieldset class="form__block">
              <legend class="form__legend">Цена</legend>
              <label class="form__label form__label--price">
                <input class="form__input" type="text" name="min-price" value="0">
                <span class="form__value">От</span>
              </label>
              <label class="form__label form__label--price">
                <input class="form__input" type="text" name="max-price" value="12345">
                <span class="form__value">До</span>
              </label>
            </fieldset>

            <fieldset class="form__block">
              <legend class="form__legend">Категория</legend>
              <label class="form__label form__label--select">
                <select class="form__select" type="text" name="category">
                  <option value="value1">Все категории</option>
                  <option value="value2">Футболки</option>
                  <option value="value3">Бюстгалтеры</option>
                  <option value="value4">Носки</option>
                </select>
              </label>
            </fieldset>

            <fieldset class="form__block">
              <legend class="form__legend">Материал</legend>
              <ul class="check-list">
                <li class="check-list__item">
                  <label class="check-list__label">
                    <input class="check-list__check sr-only"
                           type="checkbox" name="material" value="лен">
                    <span class="check-list__desc">
                    лен
                    <span>(3)</span>
                  </span>
                  </label>
                </li>
                <li class="check-list__item">
                  <label class="check-list__label">
                    <input class="check-list__check sr-only"
                           type="checkbox" name="material" value="хлопок">
                    <span class="check-list__desc">
                    хлопок
                    <span>(46)</span>
                  </span>
                  </label>
                </li>
                <li class="check-list__item">
                  <label class="check-list__label">
                    <input class="check-list__check sr-only"
                           type="checkbox" name="material" value="шерсть">
                    <span class="check-list__desc">
                    шерсть
                    <span>(20)</span>
                  </span>
                  </label>
                </li>
                <li class="check-list__item">
                  <label class="check-list__label">
                    <input class="check-list__check sr-only"
                           type="checkbox" name="material" value="шелк">
                    <span class="check-list__desc">
                    шелк
                    <span>(30)</span>
                  </span>
                  </label>
                </li>
              </ul>
            </fieldset>

            <fieldset class="form__block">
              <legend class="form__legend">Коллекция</legend>
              <ul class="check-list">
                <li class="check-list__item">
                  <label class="check-list__label">
                    <input class="check-list__check sr-only"
                           type="checkbox" name="collection" value="лето" checked="">
                    <span class="check-list__desc">
                    лето
                    <span>(2)</span>
                  </span>
                  </label>
                </li>
                <li class="check-list__item">
                  <label class="check-list__label">
                    <input class="check-list__check sr-only"
                           type="checkbox" name="collection" value="зима">
                    <span class="check-list__desc">
                    зима
                    <span>(53)</span>
                  </span>
                  </label>
                </li>
                <li class="check-list__item">
                  <label class="check-list__label">
                    <input class="check-list__check sr-only"
                           type="checkbox" name="collection" value="весна">
                    <span class="check-list__desc">
                    весна
                    <span>(24)</span>
                  </span>
                  </label>
                </li>
                <li class="check-list__item">
                  <label class="check-list__label">
                    <input class="check-list__check sr-only"
                           type="checkbox" name="collection" value="осень">
                    <span class="check-list__desc">
                    осень
                    <span>(30)</span>
                  </span>
                  </label>
                </li>
              </ul>
            </fieldset>

            <button class="filter__submit button button--primery" type="submit">
              Применить
            </button>
            <button class="filter__reset button button--second" type="button">
              Сбросить
            </button>
          </form>
        </aside>

        <section class="catalog">
          <ul class="catalog__list">
            <li class="catalog__item">
              <a class="catalog__pic" href="#">
                <img src="img/product-1.jpg" srcset="img/product-1@2x.jpg 2x" alt="Название товара">
              </a>

              <h3 class="catalog__title">
                <a href="#">
                  Кружевной бюстгалтер без косточек
                </a>
              </h3>

              <span class="catalog__price">
              3 690 ₽
            </span>

              <ul class="colors colors--black">
                <li class="colors__item">
                  <label class="colors__label">
                    <input class="colors__radio sr-only"
                           type="radio" name="color-1" value="#73B6EA" checked="">
                    <span class="colors__value" style="background-color: #73B6EA;">
                  </span>
                  </label>
                </li>
                <li class="colors__item">
                  <label class="colors__label">
                    <input class="colors__radio sr-only"
                           type="radio" name="color-1" value="#8BE000">
                    <span class="colors__value" style="background-color: #8BE000;">
                  </span>
                  </label>
                </li>
                <li class="colors__item">
                  <label class="colors__label">
                    <input class="colors__radio sr-only" type="radio" name="color-1" value="#222">
                    <span class="colors__value" style="background-color: #222;">
                  </span>
                  </label>
                </li>
              </ul>
            </li>

            <li class="catalog__item">
              <a class="catalog__pic" href="#">
                <img src="img/product-2.jpg" srcset="img/product-2@2x.jpg 2x" alt="Название товара">
              </a>

              <h3 class="catalog__title">
                <a href="#">
                  Трусы с кружевными элементами
                </a>
              </h3>

              <span class="catalog__price">
              5 660 ₽
            </span>

              <ul class="colors colors--black">
                <li class="colors__item">
                  <label class="colors__label">
                    <input class="colors__radio sr-only"
                           type="radio" name="color-2" value="#F0F0F0" checked="">
                    <span class="colors__value" style="background-color: #F0F0F0;">
                  </span>
                  </label>
                </li>
                <li class="colors__item">
                  <label class="colors__label">
                    <input class="colors__radio sr-only"
                           type="radio" name="color-2" value="#8BE000">
                    <span class="colors__value" style="background-color: #8BE000;">
                  </span>
                  </label>
                </li>
                <li class="colors__item">
                  <label class="colors__label">
                    <input class="colors__radio sr-only"
                           type="radio" name="color-2" value="#73B6EA">
                    <span class="colors__value" style="background-color: #73B6EA;">
                  </span>
                  </label>
                </li>
              </ul>
            </li>

            <li class="catalog__item">
              <a class="catalog__pic" href="#">
                <img src="img/product-3.jpg" srcset="img/product-2@2x.jpg 2x" alt="Название товара">
              </a>

              <h3 class="catalog__title">
                <a href="#">
                  Теплые шерстяные носки
                </a>
              </h3>

              <span class="catalog__price">
              790 ₽
            </span>
              <ul class="colors colors--black">
                <li class="colors__item">
                  <label class="colors__label">
                    <input class="colors__radio sr-only"
                           type="radio" name="color-02" value="#F0F0F0" checked="">
                    <span class="colors__value" style="background-color: #F0F0F0;">
                  </span>
                  </label>
                </li>
                <li class="colors__item">
                  <label class="colors__label">
                    <input class="colors__radio sr-only"
                           type="radio" name="color-02" value="#8BE000">
                    <span class="colors__value" style="background-color: #8BE000;">
                  </span>
                  </label>
                </li>
                <li class="colors__item">
                  <label class="colors__label">
                    <input class="colors__radio sr-only"
                           type="radio" name="color-02" value="#73B6EA">
                    <span class="colors__value" style="background-color: #73B6EA;">
                  </span>
                  </label>
                </li>
              </ul>
            </li>

            <li class="catalog__item">
              <a class="catalog__pic" href="#">
                <img src="img/product-4.jpg" srcset="img/product-4@2x.jpg 2x" alt="Название товара">
              </a>

              <h3 class="catalog__title">
                <a href="#">
                  Теплые шерстяные носки
                </a>
              </h3>

              <span class="catalog__price">
              690 ₽
            </span>

              <ul class="colors colors--black">
                <li class="colors__item">
                  <label class="colors__label">
                    <input class="colors__radio sr-only"
                           type="radio" name="color-3" value="#939393" checked="">
                    <span class="colors__value" style="background-color: #939393;">
                  </span>
                  </label>
                </li>
                <li class="colors__item">
                  <label class="colors__label">
                    <input class="colors__radio sr-only"
                           type="radio" name="color-3" value="#FF6B00">
                    <span class="colors__value" style="background-color: #FF6B00;">
                  </span>
                  </label>
                </li>
                <li class="colors__item">
                  <label class="colors__label">
                    <input class="colors__radio sr-only" type="radio" name="color-3" value="#222">
                    <span class="colors__value" style="background-color: #222;">
                  </span>
                  </label>
                </li>
              </ul>
            </li>

            <li class="catalog__item">
              <a class="catalog__pic" href="#">
                <img src="img/product-5.jpg" srcset="img/product-5@2x.jpg 2x" alt="Название товара">
              </a>

              <h3 class="catalog__title">
                <a href="#">
                  Носки с принтом мороженое
                </a>
              </h3>

              <span class="catalog__price">
              960 ₽
            </span>

              <ul class="colors colors--black">
                <li class="colors__item">
                  <label class="colors__label">
                    <input class="colors__radio sr-only"
                           type="radio" name="color-03" value="#939393" checked="">
                    <span class="colors__value" style="background-color: #939393;">
                  </span>
                  </label>
                </li>
                <li class="colors__item">
                  <label class="colors__label">
                    <input class="colors__radio sr-only"
                           type="radio" name="color-03" value="#FF6B00">
                    <span class="colors__value" style="background-color: #FF6B00;">
                  </span>
                  </label>
                </li>
                <li class="colors__item">
                  <label class="colors__label">
                    <input class="colors__radio sr-only" type="radio" name="color-03" value="#222">
                    <span class="colors__value" style="background-color: #222;">
                  </span>
                  </label>
                </li>
              </ul>
            </li>

            <li class="catalog__item">
              <a class="catalog__pic" href="#">
                <img src="img/product-6.jpg" srcset="img/product-7@2x.jpg 2x" alt="Название товара">
              </a>

              <h3 class="catalog__title">
                <a href="#">
                  Базовая футболка
                </a>
              </h3>

              <span class="catalog__price">
              960 ₽
            </span>

              <ul class="colors colors--black">
                <li class="colors__item">
                  <label class="colors__label">
                    <input class="colors__radio sr-only"
                           type="radio" name="color-04" value="#FFBE15" checked="">
                    <span class="colors__value" style="background-color: #FFBE15;">
                  </span>
                  </label>
                </li>
                <li class="colors__item">
                  <label class="colors__label">
                    <input class="colors__radio sr-only"
                           type="radio" name="color-04" value="#8BE000">
                    <span class="colors__value" style="background-color: #8BE000;">
                  </span>
                  </label>
                </li>
                <li class="colors__item">
                  <label class="colors__label">
                    <input class="colors__radio sr-only"
                           type="radio" name="color-04" value="#FF6B00">
                    <span class="colors__value" style="background-color: #FF6B00;">
                  </span>
                  </label>
                </li>
              </ul>
            </li>

            <li class="catalog__item">
              <a class="catalog__pic" href="#">
                <img src="img/product-7.jpg" srcset="img/product-7@2x.jpg 2x" alt="Название товара">
              </a>

              <h3 class="catalog__title">
                <a href="#">
                  Базовая хлопковая футболка
                </a>
              </h3>

              <span class="catalog__price">
              900 ₽
            </span>

              <ul class="colors colors--black">
                <li class="colors__item">
                  <label class="colors__label">
                    <input class="colors__radio sr-only"
                           type="radio" name="color-4" value="#FFBE15" checked="">
                    <span class="colors__value" style="background-color: #FFBE15;">
                  </span>
                  </label>
                </li>
                <li class="colors__item">
                  <label class="colors__label">
                    <input class="colors__radio sr-only"
                           type="radio" name="color-4" value="#8BE000">
                    <span class="colors__value" style="background-color: #8BE000;">
                  </span>
                  </label>
                </li>
                <li class="colors__item">
                  <label class="colors__label">
                    <input class="colors__radio sr-only"
                           type="radio" name="color-4" value="#FF6B00">
                    <span class="colors__value" style="background-color: #FF6B00;">
                  </span>
                  </label>
                </li>
              </ul>
            </li>

            <li class="catalog__item">
              <a class="catalog__pic" href="#">
                <img src="img/product-8.jpg" srcset="img/product-8@2x.jpg 2x" alt="Название товара">
              </a>

              <h3 class="catalog__title">
                <a href="#">
                  Базовая футболка для сна
                </a>
              </h3>

              <span class="catalog__price">
              600 ₽
            </span>

              <ul class="colors colors--black">
                <li class="colors__item">
                  <label class="colors__label">
                    <input class="colors__radio sr-only"
                           type="radio" name="color-5" value="#939393" checked="">
                    <span class="colors__value" style="background-color: #939393;">
                  </span>
                  </label>
                </li>
                <li class="colors__item">
                  <label class="colors__label">
                    <input class="colors__radio sr-only"
                           type="radio" name="color-5" value="#F0F0F0">
                    <span class="colors__value" style="background-color: #F0F0F0;">
                  </span>
                  </label>
                </li>
              </ul>
            </li>

            <li class="catalog__item">
              <a class="catalog__pic" href="#">
                <img src="img/product-9.jpg" srcset="img/product-9@2x.jpg 2x" alt="Название товара">
              </a>

              <h3 class="catalog__title">
                <a href="#">
                  Кружевной бюстгалтер на бретелях
                </a>
              </h3>

              <span class="catalog__price">
              4 990 ₽
            </span>

              <ul class="colors colors--black">
                <li class="colors__item">
                  <label class="colors__label">
                    <input class="colors__radio sr-only"
                           type="radio" name="color-6" value="#222" checked="">
                    <span class="colors__value" style="background-color: #222;">
                  </span>
                  </label>
                </li>
                <li class="colors__item">
                  <label class="colors__label">
                    <input class="colors__radio sr-only"
                           type="radio" name="color-6" value="#73B6EA">
                    <span class="colors__value" style="background-color: #73B6EA;">
                  </span>
                  </label>
                </li>
              </ul>
            </li>

            <li class="catalog__item">
              <a class="catalog__pic" href="#">
                <img src="img/product-10.jpg"
                     srcset="img/product-10@2x.jpg 2x" alt="Название товара">
              </a>

              <h3 class="catalog__title">
                <a href="#">
                  Мужские домашние шорты для сна
                </a>
              </h3>

              <span class="catalog__price">
              1 090 ₽
            </span>

              <ul class="colors colors--black">
                <li class="colors__item">
                  <label class="colors__label">
                    <input class="colors__radio sr-only"
                           type="radio" name="color-7" value="#FFBE15" checked="">
                    <span class="colors__value" style="background-color: #FFBE15;">
                  </span>
                  </label>
                </li>
                <li class="colors__item">
                  <label class="colors__label">
                    <input class="colors__radio sr-only"
                           type="radio" name="color-7" value="#8BE000">
                    <span class="colors__value" style="background-color: #8BE000;">
                  </span>
                  </label>
                </li>
                <li class="colors__item">
                  <label class="colors__label">
                    <input class="colors__radio sr-only"
                           type="radio" name="color-7" value="#222">
                    <span class="colors__value" style="background-color: #222;">
                  </span>
                  </label>
                </li>
              </ul>
            </li>

            <li class="catalog__item">
              <a class="catalog__pic" href="#">
                <img src="img/product-11.jpg"
                     srcset="img/product-11@2x.jpg 2x" alt="Название товара">
              </a>

              <h3 class="catalog__title">
                <a href="#">
                  Базовая хлопковая майка
                </a>
              </h3>

              <span class="catalog__price">
              560 ₽
            </span>

              <ul class="colors colors--black">
                <li class="colors__item">
                  <label class="colors__label">
                    <input class="colors__radio sr-only"
                           type="radio" name="color-07" value="#FFBE15" checked="">
                    <span class="colors__value" style="background-color: #FFBE15;">
                  </span>
                  </label>
                </li>
                <li class="colors__item">
                  <label class="colors__label">
                    <input class="colors__radio sr-only" type="radio" name="color-07" value="#222">
                    <span class="colors__value" style="background-color: #222;">
                  </span>
                  </label>
                </li>
              </ul>
            </li>

            <li class="catalog__item">
              <a class="catalog__pic" href="#">
                <img src="img/product-12.jpg"
                     srcset="img/product-12@2x.jpg 2x" alt="Название товара">
              </a>

              <h3 class="catalog__title">
                <a href="#">
                  Детский комбинезон (1-4 мес)
                </a>
              </h3>

              <span class="catalog__price">
              990 ₽
            </span>

              <ul class="colors colors--black">
                <li class="colors__item">
                  <label class="colors__label">
                    <input class="colors__radio sr-only"
                           type="radio" name="color-6" value="#222" checked="">
                    <span class="colors__value" style="background-color: #222;">
                  </span>
                  </label>
                </li>
                <li class="colors__item">
                  <label class="colors__label">
                    <input class="colors__radio sr-only"
                           type="radio" name="color-6" value="#FF6B00">
                    <span class="colors__value" style="background-color: #FF6B00;">
                  </span>
                  </label>
                </li>
              </ul>
            </li>
          </ul>

          <ul class="catalog__pagination pagination">
            <li class="pagination__item">
              <a class="pagination__link pagination__link--arrow pagination__link--disabled"
                 aria-label="Предыдущая страница">
                <svg width="8" height="14" fill="currentColor">
                  <use xlink:href="#icon-arrow-left"></use>
                </svg>
              </a>
            </li>
            <li class="pagination__item">
              <a class="pagination__link pagination__link--current">
                1
              </a>
            </li>
            <li class="pagination__item">
              <a class="pagination__link" href="#">
                2
              </a>
            </li>
            <li class="pagination__item">
              <a class="pagination__link" href="#">
                3
              </a>
            </li>
            <li class="pagination__item">
              <a class="pagination__link" href="#">
                4
              </a>
            </li>
            <li class="pagination__item">
              <a class="pagination__link" href="#">
                ...
              </a>
            </li>
            <li class="pagination__item">
              <a class="pagination__link" href="#">
                10
              </a>
            </li>
            <li class="pagination__item">
              <a class="pagination__link pagination__link--arrow"
                 href="#" aria-label="Следующая страница">
                <svg width="8" height="14" fill="currentColor">
                  <use xlink:href="#icon-arrow-right"></use>
                </svg>
              </a>
            </li>
          </ul>
        </section>
      </div>
    </main>

    <footer class="footer container">
      <div class="footer__wrapper">
        <ul class="footer__links">
          <li>
            <a class="footer__link" href="#">
              Каталог
            </a>
          </li>
          <li>
            <a class="footer__link" href="tel:88006009009">
              8 800 600 90 09
            </a>
          </li>
          <li>
            <a class="footer__link" href="mailto:hi@technozavrrr.com">
              hi@technozavrrr.com
            </a>
          </li>
          <li>
            <a class="footer__link" href="#">
              Распродажа
            </a>
          </li>
          <li>
            <a class="footer__link footer__link--medium" href="#">
              Заказать звонок
            </a>
          </li>
        </ul>

        <ul class="footer__social social">
          <li class="social__item">
            <a class="social__link" href="#" aria-label="Вконтакте">
              <svg width="20" height="11" fill="currentColor">
                <use xlink:href="#icon-vk"></use>
              </svg>
            </a>
          </li>
          <li class="social__item">
            <a class="social__link" href="#" aria-label="Инстаграм">
              <svg width="17" height="17" fill="currentColor">
                <use xlink:href="#icon-insta"></use>
              </svg>
            </a>
          </li>
          <li class="social__item">
            <a class="social__link" href="#" aria-label="Facebook">
              <svg width="17" height="17" fill="currentColor">
                <use xlink:href="#icon-facebook"></use>
              </svg>
            </a>
          </li>
          <li class="social__item">
            <a class="social__link" href="#" aria-label="Twitter">
              <svg width="17" height="14" fill="currentColor">
                <use xlink:href="#icon-twitter"></use>
              </svg>
            </a>
          </li>
          <li class="social__item">
            <a class="social__link" href="#" aria-label="Telegram">
              <svg width="19" height="17" fill="currentColor">
                <use xlink:href="#icon-telegram"></use>
              </svg>
            </a>
          </li>
        </ul>

        <p class="footer__desc">
          Все права на&nbsp;материалы, находящиеся на&nbsp;сайте,
          охраняются в&nbsp;соответствии с законодательством&nbsp;РФ,
          в&nbsp;том числе об&nbsp;авторском праве и&nbsp;смежных правах.
        </p>

        <ul class="footer__data">
          <li>
            <a class="footer__link" href="#" target="_blank" rel="noopener" type="application/pdf">
              Политика конфиденциальности
            </a>
          </li>
          <li>
            <a class="footer__link" href="#" target="_blank" rel="noopener" type="application/pdf">
              Публичная оферта
            </a>
          </li>
        </ul>

        <span class="footer__copyright">
        © 2020 Moire
      </span>
      </div>
    </footer>
  </div>
</template>

<script>
</script>
