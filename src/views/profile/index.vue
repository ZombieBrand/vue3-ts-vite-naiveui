<template>
  <div class="my-container">
    <ProjectCard></ProjectCard>
<!--    <el-row>-->
<!--      <el-col :span="6">-->
<!--        <project-card class="user-card"></project-card>-->
<!--      </el-col>-->
<!--      <el-col :span="18">-->
<!--        <el-card>-->
<!--          <el-tabs v-model="activeName">-->
<!--            <el-tab-pane :label="$t('msg.profile.feature')" name="feature">-->
<!--              <feature />-->
<!--            </el-tab-pane>-->
<!--            <el-tab-pane :label="$t('msg.profile.chapter')" name="chapter">-->
<!--              <chapter />-->
<!--            </el-tab-pane>-->
<!--            <el-tab-pane :label="$t('msg.profile.author')" name="author">-->
<!--              <author />-->
<!--            </el-tab-pane>-->
<!--          </el-tabs>-->
<!--        </el-card>-->
<!--      </el-col>-->
<!--    </el-row>-->
  </div>
</template>

<script lang="ts" setup>
import ProjectCard from './components/ProjectCard.vue'
import Chapter from './components/Chapter.vue'
import Feature from './components/Feature.vue'
import Author from './components/Author.vue'
import { ref } from 'vue'
const activeName = ref('feature')
</script>

<style lang="scss" scoped>
.my-container {
  .user-card {
    margin-right: 20px;
  }
}
</style>

