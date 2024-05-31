<template>
  <el-card shadow="hover" header="关于项目" class="item-background">
    <p>
      高性能 / 精致 / 优雅。基于Vue3 + Element-Plus
      的中后台前端解决方案，如果喜欢就点个星星支持一下。
    </p>
    <p>
      <a href="https://gitee.com/lolicode/scui" target="_blank">
        <img
          src="https://gitee.com/lolicode/scui/badge/star.svg?theme=dark"
          alt="star"
          style="vertical-align: middle"
        />
      </a>
    </p>
  </el-card>
</template>

<style scoped lang="scss">
:deep(.el-card__header) {
  border-bottom: 0;
  padding: 15px 20px 0 20px;
}
.item-background p {
  color: #999;
  margin-top: 10px;
  line-height: 1.8;
}
</style>
