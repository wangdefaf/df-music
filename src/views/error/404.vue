<template>
  <div class="error-page">
    <div class="error-content">
      <div class="error-code">404</div>
      <div class="error-message">页面不存在</div>
      <div class="error-description">
        抱歉，您访问的页面不存在或已被移除
      </div>
      <div class="error-actions">
        <el-button type="primary" @click="goHome">
          返回首页
        </el-button>
        <el-button @click="goBack">
          返回上页
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error404',
  
  methods: {
    goHome() {
      this.$router.push('/Home/discover')
    },
    
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.error-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 120px);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.error-content {
  text-align: center;
  color: white;
  
  .error-code {
    font-size: 120px;
    font-weight: bold;
    line-height: 1;
    margin-bottom: 20px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }
  
  .error-message {
    font-size: 36px;
    margin-bottom: 16px;
    font-weight: 500;
  }
  
  .error-description {
    font-size: 18px;
    margin-bottom: 40px;
    opacity: 0.9;
  }
  
  .error-actions {
    .el-button {
      margin: 0 10px;
      padding: 12px 24px;
      font-size: 16px;
    }
  }
}

@media (max-width: 768px) {
  .error-content {
    padding: 20px;
    
    .error-code {
      font-size: 80px;
    }
    
    .error-message {
      font-size: 24px;
    }
    
    .error-description {
      font-size: 16px;
    }
  }
}
</style>