<script setup>
import Search from "@/components/Search.vue";
import User from "@/components/User.vue";
import {useStore} from "vuex";

const store = useStore()
</script>

<template>
	<div class="main-page">
		<div class="header">
			<div class="header__title">Жилфонд</div>
			<div class="header__text">Пользователь</div>
		</div>
		<div class="content">
			<Search />
			<div class="no-users" v-if="!store.state.user.selectedUser">
				Выберите сотрудника, чтобы посмотреть его профиль
			</div>
			<User v-else />
		</div>
	</div>
</template>

<style scoped lang="scss">
@import 'src/assets/scss/variables';

.main-page {
	width: 1266px;
	margin: 0 50px 50px;
}

.header {
	display: flex;
	justify-content: space-between;
	margin: 40px 0 30px;
	
	&__title {
		font-size: 32px;
		line-height: 39px;
		font-weight: 700;
		color: $red;
		margin-top: 5px;
	}
	
	&__text {
		font-size: 16px;
		line-height: 20px;
		font-weight: 400;
		color: $black;
	}
}

.content {
	min-height: calc(100vh - 164px);
	max-height: calc(100vh - 164px);
	width: 100%;
	display: flex;
	box-shadow: 0 0 10px 0 $gray2;
	border-radius: 10px;
}

.no-users {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin: 30px;
	text-align: center;
	font-size: 14px;
	line-height: 17px;
	font-weight: 400;
	color: $gray1;
}
</style>
