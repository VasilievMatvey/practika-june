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

const holidayDate = () => {
  year = document.querySelector("#year").value;
  countryCode = document.querySelector("#country").value;
  fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`)
    .then((response) => {
      console.log(response.status);
      if (!response.ok)
        throw new Error(`Ссылка не найдена. Ошибка: ${response.status}`);
      return response.json();
    })
    .then((data) => {
      createHTML(data);
    })
    .catch((error) => {
      alert(error);
    });
};

function createHTML(array) {
  const divList = document.querySelector(".list");
  let h1 = `<h1>Праздники в ${year} году</h1>`;
  divList.insertAdjacentHTML("afterbegin", h1);
  const dateArr = [];
  for (let i = 0; i < array.length; i++) {
    dateArr.push(array[i].date);
    let date = dateArr[i];
    let mounth = dateArr[i];
    let link = `<a class ='holydayLinks' href = '#' onclick='dateInfo(${mounth.slice(
      5,
      7
    )}, ${date.slice(8)})'>${array[i].localName}</a> <br/>`;
    divList.insertAdjacentHTML("beforeend", link);
  }
}

function dateInfo(mounth, date) {
  fetch(`http://numbersapi.com/${mounth}/${date}/date`)
    .then((response) => {
      return response.text();
    })
    .then((value) => {
      const fact = document.querySelector(".fact");
      fact.innerHTML = `Этот день в истории: ${value}`;
    });
}
