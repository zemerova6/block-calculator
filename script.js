// Объявляем функцию расчета блоков
function cal(){
	// Получаем значения из полей формы и преобразуем их в числа
	const type = parseFloat(document.getElementById('type').value); // Тип блока (объем блока)
	const length = parseFloat(document.getElementById('length').value); // Длина помещения
	const width = parseFloat(document.getElementById('width').value); // Ширина помещения
	const height = parseFloat(document.getElementById('height').value); // Высота помещения
	const doors = parseFloat(document.getElementById('doors').value)|| 0; // Площадь дверей (по умолч. 0)
	const windows = parseFloat(document.getElementById('windows').value)|| 0; // Площадь окон (по умолч. 0)
	const pallet = document.getElementById('checkbox').checked; // Флаг "Рассчитать кратно поддонам"
	const rezElement = document.getElementById('rez'); // Элемент для вывода результата 
	// Проверка на заполненность обязательных полей 
	if ( isNaN(length) || isNaN(width) || isNaN(height)) {
       rezElement.innerHTML = 'Ошибка: введите корректные значения во все поля.';
       return; // Прекращение выполнения функции
    }
	// Проверка на положительные значения (площадь дверей и окон может быть 0)
	if ( length<=0 || width<=0 || height<=0 || doors<0 || windows<0 ) {
       rezElement.innerHTML = 'Ошибка: введите корректные значения во все поля.';
       return; // Прекращение выполнения функции
    }
	// Общая площадь стен 
	const plsten = (2*(length + width)*height);
	// Общая площадь окон и дверей 
	const pldoorswindows=doors+windows;
	// Общий объем кладки (0.3 - толщина стен) 
	const obshpl = (plsten-pldoorswindows)*0.3;
	// Проверка на положительный объем кладки 
	if (obshpl <= 0) {
		rezElement.innerHTML = 'Ошибка: площадь окон и дверей больше или равна стенам.';
		return; // Прекращение выполнения функции
	}
	// Рассчитываем количество блоков с округлением вверх (без запаса)
	const blocks = Math.ceil(obshpl/type);

	let colblock; // Количество блоков
    let palblock; // Количество блоков в поддонах

	// Если отмечен чекбокс "Рассчитать кратно поддонам"
	if (pallet) {
		// Определяем сколько блоков в поддоне в зависимости от типа блока 
		if (type === 0.018) {
			palblock = 36;} 
		else if (type === 0.036) {
			palblock = 24;} 
		else if (type === 0.072) {
			palblock = 8;}
		// Рассчитываем количество поддонов (с запасом) 
		colblock = Math.ceil((blocks * 1.05) / palblock);
		// Выводим результат количества блоков в поддонах
		rezElement.innerHTML = 'Вам нужно: ' + colblock + ' поддонов';}
	// Если не отмечен чекбокс "Рассчитать кратно поддонам"
	else {
		// Рассчитываем количество блоков с округлением вверх (с запасом) 
		colblock = Math.ceil(blocks * 1.05);
		// Выводим результат количества блоков
		rezElement.innerHTML = 'Вам нужно: ' + colblock + ' шт.';}
}	


