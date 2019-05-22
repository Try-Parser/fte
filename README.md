# fte guides

## Installation

```
 npm i @try-parser/fte -S
```

### Plugins

```
 import Vue from 'vue'
 import Components from '@try-parser/fte'
 import '@try-parser/fte/dist/fte.css'

 Vue.use(Components)
```

### main.ts

```
 import './plugins/fte'
```

## Example Code

```
<e-form ref="ezForm">
  <e-input v-model="firstname" 
           kv="first_name" 
           :value="firstname" 
           label="Firstname" 
           :rules="[]" 
           klass="sample class" 
           type="text"
	   tip="right">
  </e-input>
</e-form>

let form = this.$refs.ezForm

if(form.validate()) {
  console.log(form.gen())
}
 ```


## Example Rules

```
const defaultRule:any = [
	(v:any) => !!v || 'Field is required',
	(v:any) => (v && v.length <= 1024) || 'Name must be less than 1024 characters'
]

const emailRule: any = [
	(v: any) => !!v || 'E-mail is required',
	(v: any) => /.+@.+/.test(v) || 'E-mail must be valid'
]

const emptyRule: any = [
	(v: any) => !!v || 'Field is required',
]

const uuidRule: any = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
```
