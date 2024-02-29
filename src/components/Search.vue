<script setup>
import {computed, ref} from "vue";
import {useStore} from "vuex";
import avatar from '@/assets/images/img.png'
import YiInfiniteLoading from "yi-infinite-loading-vue3"

const store = useStore()

const page = ref(1)
const searchText = ref('')
const searchValues = computed(() => searchText.value.split(',').map(i => i.trim()).filter(i => i))
const isLoading = ref(false)
const isServerError = ref(false)

const search = () => {
	if (!searchValues.value.length) {
		store.commit("user/setUsers", null)
		return
	}
	isServerError.value = false
	isLoading.value = true
	store.dispatch('user/getUsers', {values: searchValues.value, page: page.value}).then((response) => {
		if (response) {
			isServerError.value = false
		} else {
			isServerError.value = true
			store.commit("user/setUsers", [])
		}
		isLoading.value = false
	})
}

const openUser = (user) => {
	store.commit("user/setSelectedUser", user)
}

const loadMore = () => {
	page.value++
	search()
}

</script>

<template>
	<div class="search-block">
		<div class="header">
			Поиск сотрудников
		</div>
		<input type="text" placeholder="Введите id или имя" @keyup.enter="search" v-model="searchText">
		<div class="search__input">
		
		</div>
		<div class="results__header">
			Результаты
		</div>
		<div class="start-search" v-if="!store.state.user.users && !isLoading && !isServerError">
			начните поиск
		</div>
		<div class="no-results" v-if="store.state.user.users && !store.state.user.users.length && !isLoading && !isServerError">
			ничего не найдено
		</div>
		<div class="results-list">
			<div class="results-item" v-for="user in store.state.user.users" :key="user.id">
				<div class="img">
					<img :src="user.image || avatar" alt="avatar">
				</div>
				<div class="info" @click="()=>openUser(user)" :class="{ selected: store.state.user.selectedUser?.id === user.id }">
					<div class="name">{{ user.name }}</div>
					<div class="email">{{ user.email }}</div>
				</div>
			</div>
			<YiInfiniteLoading
				offset="100px"
				@loadMore="loadMore"
			/>
			<div class="loading" v-if="isLoading">
				Loading...
			</div>
			<div class="loading" v-if="isServerError">
				Server error, try later...
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
@import 'src/assets/scss/variables';

.search-block {
	min-width: 300px;
	max-width: 300px;
	max-height: 100%;
	border-right: 1px solid $gray2;
	padding: 25px 20px;
}

.header {
	margin-bottom: 10px;
}

input {
	margin-bottom: 15px;
	width: 100%;
	padding: 16px;
	border-radius: 8px;
	border: 1px solid $gray3;
	font-size: 14px;
	line-height: 17px;
	font-weight: 400;
	color: $gray1;
	
	&:focus {
		outline: none;
		border: 1px solid $gray1;
	}
}

.results__header {
	margin-bottom: 10px;
}

.start-search,
.no-results {
	font-size: 14px;
	line-height: 17px;
	font-weight: 400;
}

.results-list {
	display: flex;
	flex-direction: column;
	gap: 10px;
	height: calc(100vh - 345px);
	overflow: auto;
	padding: 3px 5px 3px 0;
	
	&::-webkit-scrollbar {
		width: 4px;
	}
	&::-webkit-scrollbar-track {
		background-color: darkgrey;
	}
	&::-webkit-scrollbar-thumb {
		background-color: slategrey;
	}
}

.results-item {
	border-radius: 10px;
	box-shadow: 0 0 10px 0 #0000001A;
	display: flex;
	
	.img {
		border-right: 1px solid $gray2;
		width: 70px;
		height: 70px;
		min-width: 70px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		
		img {
			max-width: 100%;
			max-height: 100%;
			object-fit: contain;
		}
	}
	
	.info {
		padding: 0 10px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 5px;
		width: calc(100% - 70px);
		border-radius: 0 10px 10px 0;
		&:hover {
			background-color: $gray3;
			cursor: pointer;
		}
		&.selected {
			background-color: $gray4;
		}
	}
	
	.name {
		font-size: 14px;
		line-height: 17px;
		font-weight: 600;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	
	.email {
		font-size: 14px;
		line-height: 17px;
		font-weight: 600;
		color: $gray1;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
}
</style>
