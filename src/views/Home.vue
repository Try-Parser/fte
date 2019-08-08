<template>
	<v-container>
		<v-layout row wrap>
			<v-flex xs12 sm6 class="h">
				<br>
				<e-form ref="eForm">
	  				<e-input v-model="test" label="Test" :rules="rule" kv="Kyle" tip="right" mobileOnly="true"></e-input>
			  		<e-input :value="test2" label="Test" :rules="rule" kv="second" ></e-input>
			  		<e-input type="textarea" value="test2" label="Test" :rules="rule" kv="second" ></e-input>
		  			<v-btn @click="validate">validate</v-btn>
				</e-form>
		  	</v-flex>			
		  	<!-- <v-flex xs12 sm6 class="h">
				<br>
				<e-form ref="eForm">
	  				<e-input v-model="test" label="Test" :rules="rule" kv="Kyle" tip="right"></e-input>
			  		<e-input :value="test2" label="Test" :required="true" kv="second" ></e-input>
				  	<v-flex xs12>
				  		<v-layout row wrap>
				  			<v-btn @click="validate">validate</v-btn>
				  		</v-layout>
				  	</v-flex>
				</e-form>
		  	</v-flex> -->
	  	</v-layout>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import eInput from '@/components/input/fte-input.vue';
import eForm from '@/components/form/fte-form.vue';
@Component({
	components: {
		"e-input": eInput,
		"e-form": eForm
	}
})
export default class Home extends Vue {
	test: string = ""
	test2: string = "aw"
	textarea: string = ""
	rule = [
		(v:any) => !!v || 'Field is required',
		(v:any) => (v && v.length <= 100) || 'Name must be less than 100 characters',
		(v:any) => /.+@.+/.test(v) || 'Dapat email'
	]
	validate() {
		console.log(this.textarea)
		console.log((this.$refs.eForm as any).validate())
		console.log((this.$refs.eForm as any).gen())
	}
}
</script>


<style lang="scss">
	.h {
		height: 2048px;
	}
</style>