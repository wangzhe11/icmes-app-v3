<template>
  <div class="basic-list">
    <var-pull-refresh v-model="refreshing" @refresh="refresh">
      <var-list
        :finished="isFinished"
        v-model:loading="loading"
        @load="load"
        :immediate-check="false"
      >
        <slot name="default"></slot>
      </var-list>
    </var-pull-refresh>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'BasicList',
  };
</script>

<script lang="ts" setup>
  import { PropType, ref } from 'vue';
  import { PageModel } from '/#/page-model';

  const emits = defineEmits(['update:pageModel', 'update:dataList']);
  const props = defineProps({
    dataList: {
      type: Array,
      default: () => [],
    },
    pageModel: {
      type: Object as PropType<PageModel>,
      default: () => {},
    },
    getListApi: {
      type: Function,
      default: () => {},
    },
  });

  const list: any = ref([]);
  const newPageModel = reactive(props.pageModel);
  // 控制下拉刷新的状态，如果为true则会显示，则为一直处于加载中，到请求接口成功设置false,则代表刷新成功
  const refreshing = ref(false);
  // 是否在加载过程中，如果是true则不会继续出发onload事件
  const loading = ref(false);
  // 可以判断如果是上拉加载的最后一页的时候，加载成功设置为true,再上拉则不会进行加载了
  const isFinished = ref(false);

  onBeforeMount(() => {
    console.log('getList');
    getList();
  });

  function refresh() {
    refreshing.value = true;
    isFinished.value = false;
    loading.value = true;
    newPageModel.pageNo = 1;
    emits('update:pageModel', props.pageModel);
    getList();
  }

  function load() {
    console.log('11 :>> ', 11);
    loading.value = true;
    if (newPageModel.pageNo + 1 > newPageModel.totalPages) {
      isFinished.value = true;
      loading.value = false;
      console.warn('数据页面已超出最大页，不能再进行请求了');
      return;
    } else {
      newPageModel.pageNo = newPageModel.pageNo + 1;
    }
    getList();
  }

  const getList = () => {
    props.getListApi(newPageModel.pageNo).then((result: any) => {
      console.log('result :>> ', result);
      let tempList: [] = result.data.list;
      newPageModel.pageNo = result.data.pageNo;
      newPageModel.totalPages = result.data.totalPages;
      refreshing.value = false;
      loading.value = false;
      if (newPageModel.pageNo === 1) {
        list.value = tempList;
      } else {
        list.value = [...props.dataList, ...tempList];
      }
      emits('update:dataList', list.value);
      emits('update:pageModel', newPageModel);
    });
  };

  // emit('getList', list.value);
</script>

<style lang="scss" scoped>
  .basic-list {
  }
</style>
