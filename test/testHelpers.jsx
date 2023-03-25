import React from "react";
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import reducer from "@s/reduser.js";

const setupStore = preloadedState => {
  return configureStore({
    reducer,
    preloadedState
  });
};

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  } = {}
) {
  function Wrapper({children}) {
    return (
      <Provider store={store}>
        {children}
      </Provider>
    );
  }

  return {store, ...render(ui, {wrapper: Wrapper, ...renderOptions})};
}

export function fetchHelper(request) {
  return vi.fn()
    .mockReturnValue(Promise.resolve({
      ok: true,
      json: () => {
        switch (request) {
          case "getBook":
            return responseGetBook;
          case "repeats":
            return responseRepeats;
          case "fullLoad":
            return responseFullLoad;
          default:
            return responseGetBooks;
        }
      }
    }));
}

const responseFullLoad = {
  "kind": "books#volumes",
  "totalItems": 50
};

const responseGetBooks = {
  "kind": "books#volumes",
  "totalItems": 430,
  "items": [
    {
      "kind": "books#volume",
      "id": "2zhwEAAAQBAJ",
      "etag": "kFw/c/yq76c",
      "selfLink": "https://www.googleapis.com/books/v1/volumes/2zhwEAAAQBAJ",
      "volumeInfo": {
        "title": "JavaScript и Node.js для Web-разработчиков",
        "publisher": "БХВ-Петербург",
        "publishedDate": "2022",
        "description": "Книга рассказывает о языке программирования JavaScript, разработке на нем как программ общего назначения, выполняющихся в среде Node.js, так и скриптов для веб-страниц. Даны основы JavaScript: типы данных, операторы, работа с числами, строками, датой и временем, массивами, функции, классы (как старого, так и нового синтаксиса), итераторы, генераторы и класс Promise. Объяснена работа с отладчиком, встроенным в редактор Visual Studio Code. Рассказано о модулях, средствах для работы с файловой системой и программирования веб-серверов. Описана объектная модель документа. Рассмотрены средства для работы с элементами веб-страницы, самой страницей и браузером и технология AJAX (в том числе Fetch API), а также готовые программные пакеты для разработки веб-сайтов, в частности Webpack. Электронный архив на сайте издательства содержит коды всех пронумерованных листингов",
        "industryIdentifiers": [
          {
            "type": "ISBN_13",
            "identifier": "9785977568470"
          },
          {
            "type": "ISBN_10",
            "identifier": "5977568479"
          }
        ],
        "readingModes": {
          "text": false,
          "image": true
        },
        "pageCount": 768,
        "printType": "BOOK",
        "maturityRating": "NOT_MATURE",
        "allowAnonLogging": false,
        "contentVersion": "preview-1.0.0",
        "panelizationSummary": {
          "containsEpubBubbles": false,
          "containsImageBubbles": false
        },
        "imageLinks": {
          "smallThumbnail": "http://books.google.com/books/content?id=2zhwEAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
          "thumbnail": "http://books.google.com/books/content?id=2zhwEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
        },
        "language": "ru",
        "previewLink": "http://books.google.ru/books?id=2zhwEAAAQBAJ&printsec=frontcover&dq=js&hl=&cd=1&source=gbs_api",
        "infoLink": "https://play.google.com/store/books/details?id=2zhwEAAAQBAJ&source=gbs_api",
        "canonicalVolumeLink": "https://play.google.com/store/books/details?id=2zhwEAAAQBAJ"
      },
      "saleInfo": {
        "country": "RU",
        "saleability": "FOR_SALE",
        "isEbook": true,
        "listPrice": {
          "amount": 1056,
          "currencyCode": "RUB"
        },
        "retailPrice": {
          "amount": 950.4,
          "currencyCode": "RUB"
        },
        "buyLink": "https://play.google.com/store/books/details?id=2zhwEAAAQBAJ&rdid=book-2zhwEAAAQBAJ&rdot=1&source=gbs_api",
        "offers": [
          {
            "finskyOfferType": 1,
            "listPrice": {
              "amountInMicros": 1056000000,
              "currencyCode": "RUB"
            },
            "retailPrice": {
              "amountInMicros": 950400000,
              "currencyCode": "RUB"
            }
          }
        ]
      },
      "accessInfo": {
        "country": "RU",
        "viewability": "PARTIAL",
        "embeddable": true,
        "publicDomain": false,
        "textToSpeechPermission": "ALLOWED",
        "epub": {
          "isAvailable": false
        },
        "pdf": {
          "isAvailable": true,
          "acsTokenLink": "http://books.google.ru/books/download/JavaScript_%D0%B8_Node_js_%D0%B4%D0%BB%D1%8F_Web_%D1%80%D0%B0%D0%B7-sample-pdf.acsm?id=2zhwEAAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
        },
        "webReaderLink": "http://play.google.com/books/reader?id=2zhwEAAAQBAJ&hl=&source=gbs_api",
        "accessViewStatus": "SAMPLE",
        "quoteSharingAllowed": false
      },
      "searchInfo": {
        "textSnippet": "Книга рассказывает о языке программирования JavaScript, разработке на нем как программ общего назначения, выполняющихся в среде Node.js, ..."
      }
    },
    {
      "kind": "books#volume",
      "id": "MqRXAwAAQBAJ",
      "etag": "eVoFoBgFwS0",
      "selfLink": "https://www.googleapis.com/books/v1/volumes/MqRXAwAAQBAJ",
      "volumeInfo": {
        "title": "Node.js Разработка серверных веб-приложений на JavaScript",
        "authors": [
          "Дэвид Хэррон"
        ],
        "publisher": "Litres",
        "publishedDate": "2022-01-29",
        "description": "Книга посвящена разработке веб-приложений в Node.js – платформе, которая выводит язык JavaScript за пределы браузера и позволяет использовать его в серверных приложениях. В основе платформы лежит исключительно быстрый движок JavaScript, заимствованный из браузера Chrome, к которому добавлена быстрая и надежная библиотека асинхронного сетевого ввода/вывода. Основной упор в Node.js делается на создании высокопроизводительных, хорошо масштабируемых клиентских и серверных приложений.На практических примерах вы научитесь пользоваться серверным и клиентским объектами HTTP, каркасами Connect и Express, освоите алгоритмы асинхронного выполнения и узнаете, как работать с базами данных на основе SQL и с MongoDB.Начав с практических рекомендаций по установке и настройке Node.js в режиме разработки и эксплуатации, вы научитесь разрабатывать клиентские и серверные HTTP-приложения; познакомитесь с применяемой в Node.js системой организации модулей на основе спецификации CommonJS, позволяющей реализовать подмножество технологии объектно-ориентированного проектирования.Издание предназначено для программистов, знакомых с основами JavaScript и веб-разработки.",
        "industryIdentifiers": [
          {
            "type": "ISBN_13",
            "identifier": "9785457573277"
          },
          {
            "type": "ISBN_10",
            "identifier": "5457573273"
          }
        ],
        "readingModes": {
          "text": false,
          "image": true
        },
        "pageCount": 146,
        "printType": "BOOK",
        "categories": [
          "Computers"
        ],
        "maturityRating": "NOT_MATURE",
        "allowAnonLogging": true,
        "contentVersion": "1.1.1.0.preview.1",
        "panelizationSummary": {
          "containsEpubBubbles": false,
          "containsImageBubbles": false
        },
        "imageLinks": {
          "smallThumbnail": "http://books.google.com/books/content?id=MqRXAwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
          "thumbnail": "http://books.google.com/books/content?id=MqRXAwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
        },
        "language": "ru",
        "previewLink": "http://books.google.ru/books?id=MqRXAwAAQBAJ&printsec=frontcover&dq=js&hl=&cd=2&source=gbs_api",
        "infoLink": "http://books.google.ru/books?id=MqRXAwAAQBAJ&dq=js&hl=&source=gbs_api",
        "canonicalVolumeLink": "https://books.google.com/books/about/Node_js_%D0%A0%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0_%D1%81%D0%B5%D1%80%D0%B2%D0%B5.html?hl=&id=MqRXAwAAQBAJ"
      },
      "saleInfo": {
        "country": "RU",
        "saleability": "NOT_FOR_SALE",
        "isEbook": false
      },
      "accessInfo": {
        "country": "RU",
        "viewability": "PARTIAL",
        "embeddable": true,
        "publicDomain": false,
        "textToSpeechPermission": "ALLOWED",
        "epub": {
          "isAvailable": false
        },
        "pdf": {
          "isAvailable": true,
          "acsTokenLink": "http://books.google.ru/books/download/Node_js_%D0%A0%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0_%D1%81%D0%B5%D1%80%D0%B2%D0%B5-sample-pdf.acsm?id=MqRXAwAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
        },
        "webReaderLink": "http://play.google.com/books/reader?id=MqRXAwAAQBAJ&hl=&source=gbs_api",
        "accessViewStatus": "SAMPLE",
        "quoteSharingAllowed": false
      },
      "searchInfo": {
        "textSnippet": "Книга посвящена разработке веб-приложений в Node.js – платформе, которая выводит язык JavaScript за пределы браузера и позволяет ..."
      }
    }]
};

const responseGetBook = {
  "kind": "books#volume",
  "id": "3YsFAQAAQBAJ",
  "etag": "7q6p1hIVd7Y",
  "selfLink": "https://www.googleapis.com/books/v1/volumes/3YsFAQAAQBAJ",
  "volumeInfo": {
    "title": "Oral History of Germans Taken To The USSR With Their Obsolete DFS 346-Part 5",
    "authors": [
      "David Myhra PhD"
    ],
    "publisher": "RCW Technology & Ebook Publishing",
    "publishedDate": "2013-09-28",
    "description": "\u003cp\u003eThis is an oral history of several dozens of\nGerman aviation designers and engineers that were taken to the Soviet Union in\nOctober 1946 along with their DFS 346. The information contained here-in has\nnever been made public until now. Dr Myhra traveled to all the places mentioned\nand with the assistance of language interpreters Margarita Reck of\nSalem-Neufrach, West Germany and Gerhard Hopf of Naples, FL, was able to\ncommunicate with the German-speaking engineers and designers. These are the\nunedited transcriptions of the actual conversations. Very interesting material!\n&nbsp;Enjoy all 5 parts of this rare and\ninformative conversation collection!&nbsp;\u003c/p\u003e",
    "readingModes": {
      "text": false,
      "image": true
    },
    "pageCount": 100,
    "printedPageCount": 120,
    "printType": "BOOK",
    "maturityRating": "NOT_MATURE",
    "allowAnonLogging": false,
    "contentVersion": "preview-1.0.0",
    "panelizationSummary": {
      "containsEpubBubbles": false,
      "containsImageBubbles": false
    },
    "imageLinks": {
      "smallThumbnail": "http://books.google.com/books/publisher/content?id=3YsFAQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE73eugeH_DJOu_izCjSZ0lnRnG1b_frC5qM9TqQYhoOsPCNaLcl6--Jhw35riKuwCepAG9fYROxBd8AAdS2yfO6lBIGmG4daoIGpRhh9KG8_XUo-Vm_VpLLS3eGx28zxnOD1QCn7&source=gbs_api",
      "thumbnail": "http://books.google.com/books/publisher/content?id=3YsFAQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE728dfQKx7CBHza6pXIeRX71Xej8UO5b9LAtMoPEzwx5d7eM2uXwMz6YwVIPOINMdecK4Ewg_se15Fc_Loi98IxQBolWzn0efMEyN7AAAWuICurwBOjohozgQEcfoqsVPvCPU_ee&source=gbs_api",
      "small": "http://books.google.com/books/publisher/content?id=3YsFAQAAQBAJ&printsec=frontcover&img=1&zoom=2&edge=curl&imgtk=AFLRE71DtU22GZixYl-zySZ2pO9Hx7Y4Yj1OXcqwUK70RfsJ1wORNVhyZrxny3tagjQxRsXeHoZKIfbe3RyW4TfpYDe5LadEn7E87Izw6kviddx7ScoRVYW05SQ1vLVFS22KpYqN3wAR&source=gbs_api",
      "medium": "http://books.google.com/books/publisher/content?id=3YsFAQAAQBAJ&printsec=frontcover&img=1&zoom=3&edge=curl&imgtk=AFLRE702HTdLUaTuYTwtMGfr5r2psqZxkaApUX4ztZ8GsbfuJ9a-qxRnXxqDmAujwBhezBnZ4OMW0Gw240o7JyLfPomC0RVEtiwNUi9AaRInX7Y_czEDAWFZoyIkiFDIgd6eSv0wNN7X&source=gbs_api",
      "large": "http://books.google.com/books/publisher/content?id=3YsFAQAAQBAJ&printsec=frontcover&img=1&zoom=4&edge=curl&imgtk=AFLRE71DwIblAwoy7qbEuoktZj8M5BQumwxAQF03cXwuz7Ru7LMCl5ywUXkxNyOxA3OTlKKeH82jHHZ1jMgzxf-pIjefx5MVnCUkQufOv21hPUdB41njeS8sKt62_emJYpzHKXbPyH60&source=gbs_api",
      "extraLarge": "http://books.google.com/books/publisher/content?id=3YsFAQAAQBAJ&printsec=frontcover&img=1&zoom=6&edge=curl&imgtk=AFLRE71O8FkHb0oOddZfcHiWg4Jf73DMSEDykcksFJaDICf1Ts9e9nw0UkitBJJ20PnZj-Zl1455OK2ciroOSoJs3LoWw18Xj4R_LeXtV7JzgIdrt56CutOZoPvudZi5B387BOe1_Reo&source=gbs_api"
    },
    "language": "en",
    "previewLink": "http://books.google.ru/books?id=3YsFAQAAQBAJ&hl=&source=gbs_api",
    "infoLink": "https://play.google.com/store/books/details?id=3YsFAQAAQBAJ&source=gbs_api",
    "canonicalVolumeLink": "https://play.google.com/store/books/details?id=3YsFAQAAQBAJ"
  },
  "saleInfo": {
    "country": "RU",
    "saleability": "FOR_SALE",
    "isEbook": true,
    "listPrice": {
      "amount": 364.98,
      "currencyCode": "RUB"
    },
    "retailPrice": {
      "amount": 328.48,
      "currencyCode": "RUB"
    },
    "buyLink": "https://play.google.com/store/books/details?id=3YsFAQAAQBAJ&rdid=book-3YsFAQAAQBAJ&rdot=1&source=gbs_api",
    "offers": [
      {
        "finskyOfferType": 1,
        "listPrice": {
          "amountInMicros": 364980000,
          "currencyCode": "RUB"
        },
        "retailPrice": {
          "amountInMicros": 328480000,
          "currencyCode": "RUB"
        }
      }
    ]
  },
  "accessInfo": {
    "country": "RU",
    "viewability": "PARTIAL",
    "embeddable": true,
    "publicDomain": false,
    "textToSpeechPermission": "ALLOWED",
    "epub": {
      "isAvailable": false
    },
    "pdf": {
      "isAvailable": true,
      "acsTokenLink": "http://books.google.ru/books/download/Oral_History_of_Germans_Taken_To_The_USS-sample-pdf.acsm?id=3YsFAQAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
    },
    "webReaderLink": "http://play.google.com/books/reader?id=3YsFAQAAQBAJ&hl=&source=gbs_api",
    "accessViewStatus": "SAMPLE",
    "quoteSharingAllowed": false
  }
};

const responseRepeats = {
  "kind": "books#volumes",
  "totalItems": 120,
  "items": [
    {
      "kind": "books#volume",
      "id": "2zhwEAAAQBAJ",
      "etag": "kFw/c/yq76c",
      "selfLink": "https://www.googleapis.com/books/v1/volumes/2zhwEAAAQBAJ",
      "volumeInfo": {
        "title": "JavaScript и Node.js для Web-разработчиков",
        "publisher": "БХВ-Петербург",
        "publishedDate": "2022",
        "description": "Книга рассказывает о языке программирования JavaScript, разработке на нем как программ общего назначения, выполняющихся в среде Node.js, так и скриптов для веб-страниц. Даны основы JavaScript: типы данных, операторы, работа с числами, строками, датой и временем, массивами, функции, классы (как старого, так и нового синтаксиса), итераторы, генераторы и класс Promise. Объяснена работа с отладчиком, встроенным в редактор Visual Studio Code. Рассказано о модулях, средствах для работы с файловой системой и программирования веб-серверов. Описана объектная модель документа. Рассмотрены средства для работы с элементами веб-страницы, самой страницей и браузером и технология AJAX (в том числе Fetch API), а также готовые программные пакеты для разработки веб-сайтов, в частности Webpack. Электронный архив на сайте издательства содержит коды всех пронумерованных листингов",
        "industryIdentifiers": [
          {
            "type": "ISBN_13",
            "identifier": "9785977568470"
          },
          {
            "type": "ISBN_10",
            "identifier": "5977568479"
          }
        ],
        "readingModes": {
          "text": false,
          "image": true
        },
        "pageCount": 768,
        "printType": "BOOK",
        "maturityRating": "NOT_MATURE",
        "allowAnonLogging": false,
        "contentVersion": "preview-1.0.0",
        "panelizationSummary": {
          "containsEpubBubbles": false,
          "containsImageBubbles": false
        },
        "imageLinks": {
          "smallThumbnail": "http://books.google.com/books/content?id=2zhwEAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
          "thumbnail": "http://books.google.com/books/content?id=2zhwEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
        },
        "language": "ru",
        "previewLink": "http://books.google.ru/books?id=2zhwEAAAQBAJ&printsec=frontcover&dq=js&hl=&cd=1&source=gbs_api",
        "infoLink": "https://play.google.com/store/books/details?id=2zhwEAAAQBAJ&source=gbs_api",
        "canonicalVolumeLink": "https://play.google.com/store/books/details?id=2zhwEAAAQBAJ"
      },
      "saleInfo": {
        "country": "RU",
        "saleability": "FOR_SALE",
        "isEbook": true,
        "listPrice": {
          "amount": 1056,
          "currencyCode": "RUB"
        },
        "retailPrice": {
          "amount": 950.4,
          "currencyCode": "RUB"
        },
        "buyLink": "https://play.google.com/store/books/details?id=2zhwEAAAQBAJ&rdid=book-2zhwEAAAQBAJ&rdot=1&source=gbs_api",
        "offers": [
          {
            "finskyOfferType": 1,
            "listPrice": {
              "amountInMicros": 1056000000,
              "currencyCode": "RUB"
            },
            "retailPrice": {
              "amountInMicros": 950400000,
              "currencyCode": "RUB"
            }
          }
        ]
      },
      "accessInfo": {
        "country": "RU",
        "viewability": "PARTIAL",
        "embeddable": true,
        "publicDomain": false,
        "textToSpeechPermission": "ALLOWED",
        "epub": {
          "isAvailable": false
        },
        "pdf": {
          "isAvailable": true,
          "acsTokenLink": "http://books.google.ru/books/download/JavaScript_%D0%B8_Node_js_%D0%B4%D0%BB%D1%8F_Web_%D1%80%D0%B0%D0%B7-sample-pdf.acsm?id=2zhwEAAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
        },
        "webReaderLink": "http://play.google.com/books/reader?id=2zhwEAAAQBAJ&hl=&source=gbs_api",
        "accessViewStatus": "SAMPLE",
        "quoteSharingAllowed": false
      },
      "searchInfo": {
        "textSnippet": "Книга рассказывает о языке программирования JavaScript, разработке на нем как программ общего назначения, выполняющихся в среде Node.js, ..."
      }
    },
    {
      "kind": "books#volume",
      "id": "MqRXAwAAQBAJ",
      "etag": "eVoFoBgFwS0",
      "selfLink": "https://www.googleapis.com/books/v1/volumes/MqRXAwAAQBAJ",
      "volumeInfo": {
        "title": "Node.js Разработка серверных веб-приложений на JavaScript",
        "authors": [
          "Дэвид Хэррон"
        ],
        "publisher": "Litres",
        "publishedDate": "2022-01-29",
        "description": "Книга посвящена разработке веб-приложений в Node.js – платформе, которая выводит язык JavaScript за пределы браузера и позволяет использовать его в серверных приложениях. В основе платформы лежит исключительно быстрый движок JavaScript, заимствованный из браузера Chrome, к которому добавлена быстрая и надежная библиотека асинхронного сетевого ввода/вывода. Основной упор в Node.js делается на создании высокопроизводительных, хорошо масштабируемых клиентских и серверных приложений.На практических примерах вы научитесь пользоваться серверным и клиентским объектами HTTP, каркасами Connect и Express, освоите алгоритмы асинхронного выполнения и узнаете, как работать с базами данных на основе SQL и с MongoDB.Начав с практических рекомендаций по установке и настройке Node.js в режиме разработки и эксплуатации, вы научитесь разрабатывать клиентские и серверные HTTP-приложения; познакомитесь с применяемой в Node.js системой организации модулей на основе спецификации CommonJS, позволяющей реализовать подмножество технологии объектно-ориентированного проектирования.Издание предназначено для программистов, знакомых с основами JavaScript и веб-разработки.",
        "industryIdentifiers": [
          {
            "type": "ISBN_13",
            "identifier": "9785457573277"
          },
          {
            "type": "ISBN_10",
            "identifier": "5457573273"
          }
        ],
        "readingModes": {
          "text": false,
          "image": true
        },
        "pageCount": 146,
        "printType": "BOOK",
        "categories": [
          "Computers"
        ],
        "maturityRating": "NOT_MATURE",
        "allowAnonLogging": true,
        "contentVersion": "1.1.1.0.preview.1",
        "panelizationSummary": {
          "containsEpubBubbles": false,
          "containsImageBubbles": false
        },
        "imageLinks": {
          "smallThumbnail": "http://books.google.com/books/content?id=MqRXAwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
          "thumbnail": "http://books.google.com/books/content?id=MqRXAwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
        },
        "language": "ru",
        "previewLink": "http://books.google.ru/books?id=MqRXAwAAQBAJ&printsec=frontcover&dq=js&hl=&cd=2&source=gbs_api",
        "infoLink": "http://books.google.ru/books?id=MqRXAwAAQBAJ&dq=js&hl=&source=gbs_api",
        "canonicalVolumeLink": "https://books.google.com/books/about/Node_js_%D0%A0%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0_%D1%81%D0%B5%D1%80%D0%B2%D0%B5.html?hl=&id=MqRXAwAAQBAJ"
      },
      "saleInfo": {
        "country": "RU",
        "saleability": "NOT_FOR_SALE",
        "isEbook": false
      },
      "accessInfo": {
        "country": "RU",
        "viewability": "PARTIAL",
        "embeddable": true,
        "publicDomain": false,
        "textToSpeechPermission": "ALLOWED",
        "epub": {
          "isAvailable": false
        },
        "pdf": {
          "isAvailable": true,
          "acsTokenLink": "http://books.google.ru/books/download/Node_js_%D0%A0%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0_%D1%81%D0%B5%D1%80%D0%B2%D0%B5-sample-pdf.acsm?id=MqRXAwAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
        },
        "webReaderLink": "http://play.google.com/books/reader?id=MqRXAwAAQBAJ&hl=&source=gbs_api",
        "accessViewStatus": "SAMPLE",
        "quoteSharingAllowed": false
      },
      "searchInfo": {
        "textSnippet": "Книга посвящена разработке веб-приложений в Node.js – платформе, которая выводит язык JavaScript за пределы браузера и позволяет ..."
      }
    },
    {
      "kind": "books#volume",
      "id": "2zhwEAAAQBAJ",
      "etag": "kFw/c/yq76c",
      "selfLink": "https://www.googleapis.com/books/v1/volumes/2zhwEAAAQBAJ",
      "volumeInfo": {
        "title": "JavaScript и Node.js для Web-разработчиков",
        "publisher": "БХВ-Петербург",
        "publishedDate": "2022",
        "description": "Книга рассказывает о языке программирования JavaScript, разработке на нем как программ общего назначения, выполняющихся в среде Node.js, так и скриптов для веб-страниц. Даны основы JavaScript: типы данных, операторы, работа с числами, строками, датой и временем, массивами, функции, классы (как старого, так и нового синтаксиса), итераторы, генераторы и класс Promise. Объяснена работа с отладчиком, встроенным в редактор Visual Studio Code. Рассказано о модулях, средствах для работы с файловой системой и программирования веб-серверов. Описана объектная модель документа. Рассмотрены средства для работы с элементами веб-страницы, самой страницей и браузером и технология AJAX (в том числе Fetch API), а также готовые программные пакеты для разработки веб-сайтов, в частности Webpack. Электронный архив на сайте издательства содержит коды всех пронумерованных листингов",
        "industryIdentifiers": [
          {
            "type": "ISBN_13",
            "identifier": "9785977568470"
          },
          {
            "type": "ISBN_10",
            "identifier": "5977568479"
          }
        ],
        "readingModes": {
          "text": false,
          "image": true
        },
        "pageCount": 768,
        "printType": "BOOK",
        "maturityRating": "NOT_MATURE",
        "allowAnonLogging": false,
        "contentVersion": "preview-1.0.0",
        "panelizationSummary": {
          "containsEpubBubbles": false,
          "containsImageBubbles": false
        },
        "imageLinks": {
          "smallThumbnail": "http://books.google.com/books/content?id=2zhwEAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
          "thumbnail": "http://books.google.com/books/content?id=2zhwEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
        },
        "language": "ru",
        "previewLink": "http://books.google.ru/books?id=2zhwEAAAQBAJ&printsec=frontcover&dq=js&hl=&cd=1&source=gbs_api",
        "infoLink": "https://play.google.com/store/books/details?id=2zhwEAAAQBAJ&source=gbs_api",
        "canonicalVolumeLink": "https://play.google.com/store/books/details?id=2zhwEAAAQBAJ"
      },
      "saleInfo": {
        "country": "RU",
        "saleability": "FOR_SALE",
        "isEbook": true,
        "listPrice": {
          "amount": 1056,
          "currencyCode": "RUB"
        },
        "retailPrice": {
          "amount": 950.4,
          "currencyCode": "RUB"
        },
        "buyLink": "https://play.google.com/store/books/details?id=2zhwEAAAQBAJ&rdid=book-2zhwEAAAQBAJ&rdot=1&source=gbs_api",
        "offers": [
          {
            "finskyOfferType": 1,
            "listPrice": {
              "amountInMicros": 1056000000,
              "currencyCode": "RUB"
            },
            "retailPrice": {
              "amountInMicros": 950400000,
              "currencyCode": "RUB"
            }
          }
        ]
      },
      "accessInfo": {
        "country": "RU",
        "viewability": "PARTIAL",
        "embeddable": true,
        "publicDomain": false,
        "textToSpeechPermission": "ALLOWED",
        "epub": {
          "isAvailable": false
        },
        "pdf": {
          "isAvailable": true,
          "acsTokenLink": "http://books.google.ru/books/download/JavaScript_%D0%B8_Node_js_%D0%B4%D0%BB%D1%8F_Web_%D1%80%D0%B0%D0%B7-sample-pdf.acsm?id=2zhwEAAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
        },
        "webReaderLink": "http://play.google.com/books/reader?id=2zhwEAAAQBAJ&hl=&source=gbs_api",
        "accessViewStatus": "SAMPLE",
        "quoteSharingAllowed": false
      },
      "searchInfo": {
        "textSnippet": "Книга рассказывает о языке программирования JavaScript, разработке на нем как программ общего назначения, выполняющихся в среде Node.js, ..."
      }
    }]
};