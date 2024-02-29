<script setup>
import {useStore} from "vuex";
import avatar from "@/assets/images/img.png";

const store = useStore()
</script>

<template>
	<div class="user">
		<div class="avatar">
			<img :src="store.state.user.selectedUser.image || avatar" alt="avatar">
		</div>
		<div class="info">
			<div class="name">
				{{ store.state.user.selectedUser.name }}
			</div>
			<div class="email">
				<span>email: </span>{{ store.state.user.selectedUser.email }}
			</div>
			<div class="phone">
				<span>phone: </span>{{ store.state.user.selectedUser.phone }}
			</div>
			<div class="about__title">
				О себе:
			</div>
			<div class="about__content">
				{{
					store.state.user.selectedUser.about || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
				}}
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
@import 'src/assets/scss/variables';

.user {
	padding: 30px 20px;
	display: flex;
	align-items: start;
	gap: 30px;
	height: calc(100vh - 164px);
	overflow: auto;
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

.avatar {
	border: 1px solid $gray4;
	width: 424px;
	min-width: 424px;
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

.name {
	margin-bottom: 10px;
}

.email,
.phone {
	margin-bottom: 10px;
	font-size: 14px;
	line-height: 19px;
	font-weight: 400;
	color: $gray1;
	
	span {
		font-weight: 600;
		color: $black;
	}
}

.about__title {
	margin-bottom: 13px;
}

.about__content {
	font-size: 14px;
	line-height: 17px;
	font-weight: 400;
	color: $gray1;
}
</style>
