<template>
  <qd-dialog ref="dialogRef" @close="handleClose">
    234
  </qd-dialog>
</template>

<script setup lang="ts">
const dialogRef = ref()
onMounted(() => {
  dialogRef.value.init()
})
const handleClose=()=>{
  console.log(1234);
  
}
</script>

<style scoped lang="scss">

</style>