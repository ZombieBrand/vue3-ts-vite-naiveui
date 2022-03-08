<template>
    <n-card class="user-container" :title="$t('profile.introduce')">
      <div class="user-profile">
        <!-- 头像 -->
        <div class="box-center">
          <PanThumb
              :image="useStore.userInfo.avatar"
              :height="'100px'"
              :width="'100px'"
              :hoverable="false"
          >
            <div>Hello</div>
            {{ useStore.userInfo.title }}
          </PanThumb>
        </div>
        <!-- 姓名 && 角色 -->
        <div class="box-center">
          <div class="user-name text-center">
              ZombieBrand
          </div>
          <div class="user-role text-center text-muted">
            {{ useStore.userInfo.title }}
          </div>
        </div>
      </div>
      <!-- 简介 -->
      <div class="project-bio">
        <div class="project-bio-section">
          <div class="project-bio-section-header">
            <span>{{ $t('profile.projectIntroduction') }}</span>
          </div>
          <div class="project-bio-section-body">
            <div class="text-muted">
              {{ $t('profile.muted') }}
            </div>
            <div class="progress-item" v-for="item in features" :key="item.id">
              <div>{{ item.title }}</div>
              <n-progress type="line" :percentage="item.percentage" />
            </div>
          </div>
        </div>
      </div>
    </n-card>
</template>

<script lang="ts">
export default {
  name: "ProjectCard",
};
</script>
<script setup lang="ts">
import PanThumb from "@/components/PanThumb/index.vue";
import { useUserStore } from "@/store/modules/user";
const useStore = useUserStore();
defineProps({
  features: {
    type: Array,
    required: true
  }
})
</script>
<style lang="scss" scoped>
.user-container {
  .text-muted {
    font-size: 14px;
    color: #777;
  }

  .user-profile {
    text-align: center;
    .user-name {
      font-weight: bold;
    }

    .box-center {
      padding-top: 10px;
    }

    .user-role {
      padding-top: 10px;
      font-weight: 400;
    }
  }
  .project-bio {
    margin-top: 20px;
    color: #606266;
    span {
      padding-left: 4px;
    }

    .project-bio-section {
      margin-bottom: 36px;
      .project-bio-section-header {
        border-bottom: 1px solid #dfe6ec;
        padding-bottom: 10px;
        margin-bottom: 10px;
        font-weight: bold;
      }
      .project-bio-section-body {
        .progress-item {
          margin-top: 10px;
          div {
            font-size: 14px;
            margin-bottom: 2px;
          }
        }
      }
    }
  }
}
</style>
