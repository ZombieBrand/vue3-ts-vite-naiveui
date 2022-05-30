<template>
  <div class="user-manage-container">
    <n-space vertical>
      <n-card title="功能">
        <n-space> </n-space>
      </n-card>
      <n-card>
        <n-data-table
          :columns="columns"
          :data="tableData"
          :pagination="paginationOptions"
        />
      </n-card>
    </n-space>
  </div>
</template>

<script lang="ts">
export default {
  name: "ArticleRanking",
};
</script>
<script setup lang="ts">
import { ref, h } from "vue";
import type { Ref } from "vue";
import { getArticleList as apiGetArticleList } from "@/api/article";
import { NSpace } from "naive-ui";
import type { DataTableColumns } from "naive-ui";
import type { List } from "@/types/article";
import { t } from "@/locales";
import { relativeTime } from "@/filter";
import { paginationOptions } from "@/components/TableData";
// 数据相关
const tableData: Ref<List[] | never[]> = ref([]);

// 获取数据方法

const getArticleList = async () => {
  const {
    result: { list },
  } = await apiGetArticleList();
  tableData.value = list;
};
getArticleList();
const createColumns = (): DataTableColumns<List> => {
  return [
    {
      title: t("article.ranking"),
      key: "ranking",
    },
    {
      title: t("article.title"),
      key: "title",
    },
    {
      title: t("article.author"),
      key: "author",
    },
    {
      title: t("article.publicDate"),
      key: "publicDate",
      render(row) {
        return relativeTime(row.publicDate);
      },
    },
    {
      title: t("article.desc"),
      key: "desc",
    },
  ];
};
const columns = createColumns();
</script>

<style lang="scss" scoped></style>
