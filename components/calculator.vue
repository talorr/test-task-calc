<template>
    <div>
        <div class="h-[60px] w-fit flex">
            <div @click="currentRoom=index" v-for="(room,index) in rooms" :key="room.id" :class="{'bg-neutral-300':currentRoom==index}" class="w-[140px] transition-colors hover:bg-neutral-300 cursor-pointer shadow text-zinc-800 text-lg flex justify-center items-center">
                <!-- <p v-if="rename==false" @click="rename = !rename" class="overflow-clip px-1">{{ room.name }}</p> -->
                <input  @change="setLocalStorage()" class="text-center w-full bg-transparent px-5 outline-none border-none text-base" v-model="rooms[index].name">
                <p class="cursor-pointer absolute text-xl mb-11 ml-28 text-zinc-400/70" @click="deleteRoom(index)">х</p> 
            </div>
            <div @click="addRoom()" class="transition-colors hover:bg-neutral-400 cursor-pointer w-[205px] shadow bg-neutral-300 flex justify-center items-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.875 7.5H8.5V5.125C8.5 5.05625 8.44375 5 8.375 5H7.625C7.55625 5 7.5 5.05625 7.5 5.125V7.5H5.125C5.05625 7.5 5 7.55625 5 7.625V8.375C5 8.44375 5.05625 8.5 5.125 8.5H7.5V10.875C7.5 10.9437 7.55625 11 7.625 11H8.375C8.44375 11 8.5 10.9437 8.5 10.875V8.5H10.875C10.9437 8.5 11 8.44375 11 8.375V7.625C11 7.55625 10.9437 7.5 10.875 7.5Z" fill="black"/>
                <path d="M8 1C4.13438 1 1 4.13438 1 8C1 11.8656 4.13438 15 8 15C11.8656 15 15 11.8656 15 8C15 4.13438 11.8656 1 8 1ZM8 13.8125C4.79063 13.8125 2.1875 11.2094 2.1875 8C2.1875 4.79063 4.79063 2.1875 8 2.1875C11.2094 2.1875 13.8125 4.79063 13.8125 8C13.8125 11.2094 11.2094 13.8125 8 13.8125Z" fill="black"/>
                </svg>
                <p class="ml-[12px] text-lg text-zinc-800">Добавить комнату</p>
            </div>
        </div>
        <div class="md:h-[480px] h-[650px] md:shadow-2xl w-full bg-white flex">
            <div class="md:pt-[40px] pt-[20px] xl:w-[57%] pl-3 md:px-10 flex flex-col justify-start items-center">
                <div class="w-full flex md:flex-row flex-col justify-start">
                    <div class="pr-[15px]">
                        <p>Площадь помещения:</p>
                        <div class="md:w-[295px] w-[343px] h-[60px] bg-neutral-300 bg-opacity-20 flex justify-between items-center px-3">
                                <Minusbutton @click="areaDecrement"/>   
                                <p class="text-lg">{{ rooms[currentRoom].area }} м<sup>2</sup></p>                 
                                <Plusbutton @click="rooms[currentRoom].area++"/>
                        </div>
                    </div>
                    <div class="md:mt-0 mt-[10px] md:pl-[15px]">
                        <p>Количество углов:</p>
                        <div class="md:w-[295px] w-[343px] h-[60px] bg-neutral-300 bg-opacity-20 flex justify-between items-center px-3">
                                <Minusbutton @click="cornerCountDecrement"/>            
                                <p class="text-lg">{{ rooms[currentRoom].cornerCount }} шт.</p>          
                                <Plusbutton @click="rooms[currentRoom].cornerCount++"/>
                        </div>
                    </div>     
                </div>


                <div class="md:mt-[35px] mt-[10px] md:flex-row flex-col w-full flex justify-start">
                    <div class="pr-[15px]">
                        <p>Фактура потолка:</p>
                        <div class="md:w-[295px] w-[343px] h-[60px] bg-neutral-300 bg-opacity-20 flex justify-between items-center">                   
                                <Dropdown v-model="rooms[currentRoom].selectedTexture" :options="textures" placeholder="Выберите фактуру"  class="w-full h-full bg-neutral-300 bg-opacity-20"></Dropdown>
                        </div>
                    </div>
                    <div class="md:mt-0 mt-[10px] md:pl-[15px]">
                        <p>Цвет потолка:</p>
                            <div class="md:w-[295px] w-[343px] h-[60px] bg-neutral-300 bg-opacity-20 flex justify-between items-center">    
                                <Dropdown v-model="rooms[currentRoom].selectedColor" :options="colors" placeholder="Выберите цвет"  class="w-full h-full bg-neutral-300 bg-opacity-20"></Dropdown>
                        </div>
                    </div>     
                </div>


                <div class="md:mt-[35px] mt-[10px] w-full flex md:justify-start md:flex-row flex-col md:items-center">
                    <div>
                        <span class="text-zinc-800 text-[26px] md:text-4xl font-medium">Итого: </span>
                        <span class="text-pink-700 text-[26px] md:text-4xl font-medium">{{ cost }}</span>
                        <span class="text-zinc-800 text-[26px] md:text-4xl font-medium">{{ declension(cost) }}</span>
                    </div>
                    <p class="ml-1 text-black text-lg font-normal">(Ориентировочная стоимость)</p>
                </div>
                <div class="md:mt-[35px] mt-[10px] w-full flex justify-start items-center">
                    <acceptbutton @click="modalIsVisible = true"></acceptbutton>
                    <downloadbutton @click="()=>{}"></downloadbutton>
                </div>

            </div>     
            <img class="overflow-hidden object-cover hidden md:block w-[43%]" src="https://i.ibb.co/jz4V4p5/Rectangle-1111.png">
            <modal-order v-if="modalIsVisible"/>
        </div>

    </div>
</template>

<script setup>
// Вывод массива комнат из ls
onMounted(() => {
    if (localStorage.getItem('roomsArray') != null && localStorage.getItem('roomsArray') != []) {
        rooms.value = JSON.parse(localStorage.getItem('roomsArray'))
    }
})
const cost = ref()
const pricePerQuareMeter = ref('')
const modalIsVisible = ref(false)
const currentRoom = ref(0)
const textures = ref([
    'ПВХ',
    'Тканевый',

]);
const colors = ref([
    'Белый',
    'Цветной',
]);
const rooms = ref([
    {
        id: 1,
        name: "Комната №1",
        area: 10,
        cornerCount: 1,
        selectedColor: "Белый",
        selectedTexture: "ПВХ"
    }
])

// Декрементирование площади
const areaDecrement = () => {
    rooms.value[currentRoom.value].area > 10 ? rooms.value[currentRoom.value].area-- : rooms.value[currentRoom.value].area
}
// Декрементирование кол-ва углов
const cornerCountDecrement = () => {
    rooms.value[currentRoom.value].cornerCount > 1 ? rooms.value[currentRoom.value].cornerCount-- : rooms.value[currentRoom.value].cornerCount
}
// Выбор комбинации цвета и фактуры
const costSelector = watchEffect(() => {
    if (rooms.value[currentRoom.value].selectedColor == 'Белый') {
        if (rooms.value[currentRoom.value].selectedTexture == 'ПВХ') {  pricePerQuareMeter.value = 1390 }
        else if(rooms.value[currentRoom.value].selectedTexture == 'Тканевый') { pricePerQuareMeter.value = 2250 }
    }
    else if (rooms.value[currentRoom.value].selectedColor == 'Цветной') {
        if (rooms.value[currentRoom.value].selectedTexture == 'ПВХ') {  pricePerQuareMeter.value = 1600 }
        else if(rooms.value[currentRoom.value].selectedTexture == 'Тканевый') {  pricePerQuareMeter.value = 2460 }
    }
})
// Подсчёт итоговой цены
const totalCost = watchEffect(() => {
    cost.value = pricePerQuareMeter.value * rooms.value[currentRoom.value].area + 100 * rooms.value[currentRoom.value].cornerCount
})
//Склонение итоговой цены
const declension = (cost) => {
    if (cost % 10 === 1 && cost !== 11) {
        return ' рубль'
    }
    else if ((cost > 20 || cost < 10) && (cost % 10 > 1 && cost % 10 < 5)) {
        return ' рубля'
    }
    else {
        return ' рублей'
    }
}
// Удаление комнаты
const deleteRoom = (id) => {
    if (rooms.value.length > 1) {
        rooms.value.splice(id, 1)
        setLocalStorage()
    }
}
// Добавление комнаты
const addRoom = () => {
    rooms.value = [...rooms.value, {
        id: rooms.value.length + 1,
        name: "Комната №" + parseInt(rooms.value.length + 1),
        area: 10,
        cornerCount: 1,
        selectedColor: "Белый",
        selectedTexture: "ПВХ"
    }]
    setLocalStorage()
}
// Наблюдатель который вносит изменения в Localstorage при изменении значения итоговой цены
const watcherSetLocalStorage = watch([cost], () => {
    setLocalStorage()
})

// Функция которая сохраняет данные о комнатах в Localstorage
const setLocalStorage = () => {
    localStorage.setItem('roomsArray', JSON.stringify(rooms.value))
}
</script>

<style scoped>

:deep(.p-dropdown-trigger){
    background-color:rgb(190 24 93) !important;
    width:40px !important;
    margin-right:10px;
    color: white !important;
    height: 40px !important;
    border-radius: 0 !important;
}
:deep(.p-dropdown){
    display: flex;
    align-items: center;
    border-radius: 0 !important;
    box-shadow: none !important;
}
:deep(.p-dropdown:hover){
    border-color:rgb(190 24 93) !important
}
:deep(.p-dropdown:not(.p-disabled).p-focus){
    border-color:rgb(190 24 93) !important
}
</style>