const yearList = document.getElementById("year_list");
for (let i = 1970; i <= 2023; i++) {
  const opt = document.createElement("option");
  opt.value = i;
  opt.text = i; // добавить отображение текста
  yearList.appendChild(opt);
}
//создаём динамический список стран через запрос к api, который загружается сразу после загрузки Dom дерева
const countryList = () => {
  fetch(`https://date.nager.at/api/v3/AvailableCountries`)
    .then((response) => {
      console.log(response.status);
      if (!response.ok)
        throw new Error(`Ссылка не найдена. Ошибка: ${response.status}`);
      return response.json();
    })
    .then((data) => {
      const datalist = document.querySelector(".datalist");
      for (let i = 0; i < data.length; i++) {
        let option = `<option value="${data[i].countryCode}">${data[i].name}</option>`;
        datalist.insertAdjacentHTML("beforeend", option);
      }
    })
    .catch((error) => {
      alert(error);
    });
};
document.addEventListener("DOMContentLoaded", countryList);

//прослушивание события на кнопку и вызов функции
const btn = document.querySelector(".button");
btn.addEventListener("click", (event) => {
  event.preventDefault();
  holidayDate();
});

//функция делает запрос к api и полученную информацию отправляет в sortArr
const holidayDate = () => {
  year = document.querySelector("#year").value;
  mounth = document.querySelector("#mounth").value;
  countryCode = document.querySelector("#country").value;
  fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`)
    .then((response) => {
      console.log(response.status);
      if (!response.ok)
        throw new Error(`Ссылка не найдена. Ошибка: ${response.status}`);
      return response.json();
    })
    .then((data) => {
      sortArr(data, mounth);
    })
    .catch((error) => {
      alert(error);
    });
};

//функция сортирует праздники по месяцу, который выбрал пользователь, и добавляет подходящие в массив
function sortArr(arr, mounth) {
  let numberOfMounth;
  let mounthName;
  const sortingArr = [];
  switch (mounth) {
    case "January":
      numberOfMounth = "01";
      mounthName = "Январе";
      break;
    case "Febuary":
      numberOfMounth = "02";
      mounthName = "Феврале";

      break;
    case "March":
      numberOfMounth = "03";
      mounthName = "Марте";

      break;
    case "April":
      numberOfMounth = "04";
      mounthName = "Апреле";

      break;
    case "May":
      numberOfMounth = "05";
      mounthName = "Мае";

      break;
    case "June":
      numberOfMounth = "06";
      mounthName = "Июне";

      break;
    case "July":
      numberOfMounth = "07";
      mounthName = "Июле";

      break;
    case "August":
      numberOfMounth = "08";
      mounthName = "Августе";

      break;
    case "September":
      numberOfMounth = "09";
      mounthName = "Сентябре";

      break;
    case "October":
      numberOfMounth = "10";
      mounthName = "Октябре";

      break;
    case "November":
      numberOfMounth = "11";
      mounthName = "Ноябре";

      break;
    case "December":
      numberOfMounth = "12";
      mounthName = "Декабре";
      break;
    default:
      return "Указан неверный месяц";
  }

  arr.forEach((element) => {
    if (element.date.slice(5, 7) === numberOfMounth) {
      sortingArr.push(element);
    }
  });
  createHTML(sortingArr, mounthName);
}

//создаёт html-код и выводит его на страницу (выводятся названия праздников в выбранном пользователем месяце)
function createHTML(array, mounth) {
  const divList = document.querySelector(".list");
  if (divList.childElementCount > 1) {
    divList.replaceChildren();
  }
  if (array.length === 0) {
    divList.insertAdjacentHTML(
      "beforeend",
      "<p>В выбраном месяце праздников не было</p>"
    );
  }
  let h1 = `<h1>Праздники в ${mounth} в ${year} году</h1>`;
  divList.insertAdjacentHTML("afterbegin", h1);
  const dateArr = [];
  for (let i = 0; i < array.length; i++) {
    dateArr.push(array[i].date);
    let date = dateArr[i];
    let mounth = dateArr[i];
    let link = `<a class ='holydayLinks' href = '#' onclick='dateInfo(${mounth.slice(
      5,
      7
    )}, ${date.slice(8)})'>${array[i].localName}</a>  `;
    divList.insertAdjacentHTML("beforeend", link);
  }
}

//из api numbersapi получает рандомный факт о дате и выводит его на страницу
function dateInfo(mounth, date) {
  fetch(`http://numbersapi.com/${mounth}/${date}/date`)
    .then((response) => {
      return response.text();
    })
    .then((value) => {
      const factsDiv = document.querySelector(".facts");
      factsDiv.style.visibility = "visible";
      const fact = document.querySelector(".fact");
      fact.innerHTML = `Этот день в истории: ${value}`;
    });
}
