<template>
    <div>
        <div class="fixed z-50 flex justify-center items-center w-full left-0 top-0 h-[100vh] bg-slate-300/70">
            <div class="w-[640px] h-[500px] bg-white shadow-xl">
                <div class="p-10 flex flex-col items-center">
                    <h1 class="mb-8 text-2xl font-bold">Подать заявку</h1>
                    <label>Ваше имя</label>
                    <input placeholder="Иванов Иван Иванович" class="pl-4 mt-2 mb-6 h-10 w-72 border outline-none focus:border-neutral-600 border-neutral-300">
                    <label>Номер телефона</label>
                    <input placeholder="+7(999)-999-99-99" class="pl-4 mt-2 mb-24 h-10 w-72 border outline-none focus:border-neutral-600 border-neutral-300">
                    <div>
                        <div class="transition-colors md:w-[232px] cursor-pointer hover:bg-pink-600 md:h-[60px] w-[168px] h-[50px] bg-pink-700 flex justify-center items-center rounded-[5px]">
                            <p class="text-white text-xs md:text-lg font-medium uppercase tracking-wide">Подтвердить</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>