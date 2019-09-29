<template>
	<div>
		<button @click="increment()">+</button>
		<button v-on:click="decrement()">-</button>
		<p><span>child:{{num}}</span></p>
	</div>
</template>

<script>
	export default{
		props:["num"],
		data(){
			return{
				msg:"hello"
			}
		},
		methods:{
			increment(){
				this.$emit("incre")
			},
			decrement(){
				this.$emit("decre")
			}
		}
	}
</script>

<style>
</style>
