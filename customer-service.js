document.addEventListener('DOMContentLoaded', function() {
  // 获取DOM元素
  const customerServiceIcon = document.querySelector('.customer-service-icon');
  const customerServiceDialog = document.getElementById('customer-service-dialog');
  const dialogHeader = customerServiceDialog.querySelector('.dialog-header');
  const closeBtn = customerServiceDialog.querySelector('.close-btn');
  const iframe = customerServiceDialog.querySelector('iframe');
  const resizeHandle = document.createElement('div');
  resizeHandle.classList.add('resize-handle');
  customerServiceDialog.appendChild(resizeHandle);

  // 状态变量
  let isDraggingIcon = false;
  let isDraggingDialog = false;
  let isResizingDialog = false;
  let iconStartX, iconStartY, iconInitialX, iconInitialY;
  let dialogStartX, dialogStartY, dialogInitialX, dialogInitialY;
  let startWidth, startHeight, startResizeX, startResizeY;

  // 初始化
  initElements();

  // 节流函数
  function throttle(fn, delay) {
    let lastCall = 0;
    let timeout;
    return function(...args) {
      const now = Date.now();
      if (now - lastCall < delay) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          lastCall = now;
          fn(...args);
        }, delay - (now - lastCall));
        return;
      }
      lastCall = now;
      return fn(...args);
    };
  }

  // 初始化元素
  function initElements() {
    loadSavedPositions();
    setupEventListeners();
    setupGlobalKeyListener(); // 新增全局键盘监听
  }

  // 设置全局键盘监听（确保始终有效）
  function setupGlobalKeyListener() {
    // 在捕获阶段监听，确保最先执行
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' || e.keyCode === 27) {
        // 阻止其他可能存在的ESC键处理
        e.stopImmediatePropagation();
        e.preventDefault();
        
        // 添加视觉反馈
        customerServiceDialog.classList.add('esc-pressed');
        setTimeout(() => customerServiceDialog.classList.remove('esc-pressed'), 200);
        
        // 切换对话框状态
        toggleDialog();
      }
    }, true); // 使用捕获阶段
  }

  // 加载保存的位置
  function loadSavedPositions() {
    // 图标位置
    const savedIconPos = localStorage.getItem('customerServiceIconPosition');
    if (savedIconPos) {
      const pos = JSON.parse(savedIconPos);
      customerServiceIcon.style.left = pos.left;
      customerServiceIcon.style.top = pos.top;
      customerServiceIcon.style.right = 'auto';
      customerServiceIcon.style.bottom = 'auto';
    }

    // 对话框位置和大小
    const savedDialogState = localStorage.getItem('customerServiceDialogState');
    if (savedDialogState) {
      const state = JSON.parse(savedDialogState);
      customerServiceDialog.style.left = state.left;
      customerServiceDialog.style.top = state.top;
      customerServiceDialog.style.width = state.width;
      customerServiceDialog.style.height = state.height;
      
      if (state.isOpen) {
        customerServiceDialog.style.display = 'block';
      }
    }
  }

  // 设置事件监听器
  function setupEventListeners() {
    // 图标拖动事件
    customerServiceIcon.addEventListener('mousedown', startDragIcon);
    customerServiceIcon.addEventListener('touchstart', startDragIcon, { passive: false });
    
    // 图标点击事件
    customerServiceIcon.addEventListener('click', handleIconClick);
    
    // 对话框关闭按钮
    closeBtn.addEventListener('click', toggleDialog);
    
    // 对话框拖动事件
    dialogHeader.addEventListener('mousedown', startDragDialog);
    dialogHeader.addEventListener('touchstart', startDragDialog, { passive: false });
    
    // 对话框调整大小事件
    resizeHandle.addEventListener('mousedown', startResizeDialog);
    resizeHandle.addEventListener('touchstart', startResizeDialog, { passive: false });
    
    // 全局移动事件 - 使用节流
    const throttledMove = throttle(handleMove, 16);
    document.addEventListener('mousemove', throttledMove);
    document.addEventListener('touchmove', throttledMove, { passive: false });
    
    // 全局释放事件
    document.addEventListener('mouseup', stopActions);
    document.addEventListener('touchend', stopActions);
    
    // 点击外部关闭对话框
    document.addEventListener('click', handleOutsideClick, true);
    
    // 窗口大小改变事件
    window.addEventListener('resize', handleWindowResize);
  }

  // 开始拖动图标
  function startDragIcon(e) {
    if (e.touches && e.touches.length > 1) return;
    
    isDraggingIcon = true;
    const rect = customerServiceIcon.getBoundingClientRect();
    iconInitialX = rect.left;
    iconInitialY = rect.top;
    iconStartX = e.clientX || e.touches[0].clientX;
    iconStartY = e.clientY || e.touches[0].clientY;
    
    customerServiceIcon.style.cursor = 'grabbing';
    customerServiceIcon.style.transition = 'none';
    customerServiceIcon.style.zIndex = '10001';
    
    e.preventDefault();
    // 不要阻止冒泡，以免影响键盘事件
  }

  // 开始拖动对话框
  function startDragDialog(e) {
    isDraggingDialog = true;
    dialogInitialX = customerServiceDialog.offsetLeft;
    dialogInitialY = customerServiceDialog.offsetTop;
    dialogStartX = e.clientX || e.touches[0].clientX;
    dialogStartY = e.clientY || e.touches[0].clientY;
    
    document.body.style.userSelect = 'none';
    customerServiceDialog.style.transition = 'none';
    customerServiceDialog.style.opacity = '0.9';
    customerServiceDialog.style.boxShadow = '0 0 15px rgba(0, 0, 0, 0.3)';
    customerServiceDialog.style.zIndex = '10001';
    
    e.preventDefault();
    // 不要阻止冒泡，以免影响键盘事件
  }

  // 开始调整对话框大小
  function startResizeDialog(e) {
    isResizingDialog = true;
    startWidth = customerServiceDialog.offsetWidth;
    startHeight = customerServiceDialog.offsetHeight;
    startResizeX = e.clientX || e.touches[0].clientX;
    startResizeY = e.clientY || e.touches[0].clientY;
    
    customerServiceDialog.classList.add('resizing');
    document.body.style.cursor = 'nwse-resize';
    
    e.preventDefault();
    // 不要阻止冒泡，以免影响键盘事件
  }

  // 处理移动事件
  function handleMove(e) {
    if (isDraggingIcon) {
      dragIcon(e);
    } else if (isDraggingDialog) {
      dragDialog(e);
    } else if (isResizingDialog) {
      resizeDialog(e);
    }
  }

  // 拖动图标
  function dragIcon(e) {
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    
    if (clientX === undefined || clientY === undefined) return;
    
    const dx = clientX - iconStartX;
    const dy = clientY - iconStartY;
    
    let newX = iconInitialX + dx;
    let newY = iconInitialY + dy;
    
    const maxX = window.innerWidth - customerServiceIcon.offsetWidth;
    const maxY = window.innerHeight - customerServiceIcon.offsetHeight;
    
    newX = Math.max(0, Math.min(newX, maxX));
    newY = Math.max(0, Math.min(newY, maxY));
    
    customerServiceIcon.style.left = `${newX}px`;
    customerServiceIcon.style.top = `${newY}px`;
    customerServiceIcon.style.right = 'auto';
    customerServiceIcon.style.bottom = 'auto';
    
    e.preventDefault();
  }

  // 拖动对话框
  function dragDialog(e) {
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    
    if (clientX === undefined || clientY === undefined) return;
    
    const dx = clientX - dialogStartX;
    const dy = clientY - dialogStartY;
    
    // 使用transform进行临时移动
    customerServiceDialog.style.transform = `translate(${dx}px, ${dy}px)`;
    
    e.preventDefault();
  }

  // 调整对话框大小
  function resizeDialog(e) {
    if (!isResizingDialog) return;
    
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    
    if (clientX === undefined || clientY === undefined) return;
    
    requestAnimationFrame(() => {
      let newWidth = startWidth + clientX - startResizeX;
      let newHeight = startHeight + clientY - startResizeY;
      
      newWidth = Math.max(300, Math.min(newWidth, window.innerWidth - 20));
      newHeight = Math.max(200, Math.min(newHeight, window.innerHeight - 20));
      
      customerServiceDialog.style.width = `${newWidth}px`;
      customerServiceDialog.style.height = `${newHeight}px`;
      
      adjustDialogPosition();
    });
    
    e.preventDefault();
  }

  // 停止所有操作
  function stopActions(e) {
    if (isDraggingIcon) {
      const clientX = e.clientX || (e.changedTouches && e.changedTouches[0].clientX);
      const clientY = e.clientY || (e.changedTouches && e.changedTouches[0].clientY);
      
      if (clientX && clientY) {
        const dx = clientX - iconStartX;
        const dy = clientY - iconStartY;
        
        let newX = iconInitialX + dx;
        let newY = iconInitialY + dy;
        
        const maxX = window.innerWidth - customerServiceIcon.offsetWidth;
        const maxY = window.innerHeight - customerServiceIcon.offsetHeight;
        
        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));
        
        customerServiceIcon.style.left = `${newX}px`;
        customerServiceIcon.style.top = `${newY}px`;
      }
      
      isDraggingIcon = false;
      customerServiceIcon.style.cursor = 'grab';
      customerServiceIcon.style.transition = 'transform 0.2s, box-shadow 0.2s';
      customerServiceIcon.style.zIndex = '10000';
      saveIconPosition();
    }
    
    if (isDraggingDialog) {
      const clientX = e.clientX || (e.changedTouches && e.changedTouches[0].clientX);
      const clientY = e.clientY || (e.changedTouches && e.changedTouches[0].clientY);
      
      if (clientX && clientY) {
        const dx = clientX - dialogStartX;
        const dy = clientY - dialogStartY;
        
        let newX = dialogInitialX + dx;
        let newY = dialogInitialY + dy;
        
        const maxX = window.innerWidth - customerServiceDialog.offsetWidth;
        const maxY = window.innerHeight - customerServiceDialog.offsetHeight;
        
        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));
        
        customerServiceDialog.style.left = `${newX}px`;
        customerServiceDialog.style.top = `${newY}px`;
      }
      
      isDraggingDialog = false;
      customerServiceDialog.style.transform = 'none';
      customerServiceDialog.style.transition = 'all 0.2s ease';
      customerServiceDialog.style.opacity = '1';
      customerServiceDialog.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
      customerServiceDialog.style.zIndex = '9999';
      document.body.style.userSelect = '';
      saveDialogState(customerServiceDialog.style.display === 'block');
    }
    
    if (isResizingDialog) {
      isResizingDialog = false;
      customerServiceDialog.classList.remove('resizing');
      document.body.style.cursor = '';
      saveDialogState(customerServiceDialog.style.display === 'block');
    }
  }

  // 处理图标点击
  function handleIconClick(e) {
    if (isDraggingIcon) return;
    
    const moveThreshold = 5;
    const dx = Math.abs((e.clientX || (e.touches && e.touches[0].clientX)) - iconStartX);
    const dy = Math.abs((e.clientY || (e.touches && e.touches[0].clientY)) - iconStartY);
    
    if ((dx < moveThreshold && dy < moveThreshold) || !iconStartX) {
      toggleDialog();
    }
  }

  // 切换对话框显示/隐藏
  function toggleDialog() {
    if (customerServiceDialog.style.display === 'block') {
      customerServiceDialog.style.display = 'none';
      saveDialogState(false);
    } else {
      if (window.innerWidth <= 768) {
        customerServiceDialog.style.width = '95%';
        customerServiceDialog.style.height = '80%';
        customerServiceDialog.style.left = '2.5%';
        customerServiceDialog.style.top = '10%';
      }
      customerServiceDialog.style.display = 'block';
      saveDialogState(true);
    }
  }

  // 处理点击外部关闭
  function handleOutsideClick(e) {
    if (customerServiceDialog.style.display === 'block' &&
        !customerServiceDialog.contains(e.target) && 
        e.target !== customerServiceIcon && 
        !customerServiceIcon.contains(e.target)) {
      customerServiceDialog.style.display = 'none';
      saveDialogState(false);
    }
  }

  // 调整对话框位置
  function adjustDialogPosition() {
    const dialogRect = customerServiceDialog.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    let left = parseInt(customerServiceDialog.style.left) || 0;
    let top = parseInt(customerServiceDialog.style.top) || 0;
    
    if (left + dialogRect.width > windowWidth) {
      left = windowWidth - dialogRect.width - 10;
    }
    
    if (top + dialogRect.height > windowHeight) {
      top = windowHeight - dialogRect.height - 10;
    }
    
    left = Math.max(0, left);
    top = Math.max(0, top);
    
    customerServiceDialog.style.left = `${left}px`;
    customerServiceDialog.style.top = `${top}px`;
  }

  // 处理窗口大小改变
  function handleWindowResize() {
    const iconRect = customerServiceIcon.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    if (iconRect.right > windowWidth || iconRect.bottom > windowHeight) {
      customerServiceIcon.style.left = `${Math.max(0, windowWidth - iconRect.width - 10)}px`;
      customerServiceIcon.style.top = `${Math.max(0, windowHeight - iconRect.height - 10)}px`;
      saveIconPosition();
    }
    
    if (customerServiceDialog.style.display === 'block') {
      adjustDialogPosition();
      
      if (window.innerWidth <= 768) {
        customerServiceDialog.style.width = '95%';
        customerServiceDialog.style.height = '80%';
        customerServiceDialog.style.left = '2.5%';
        customerServiceDialog.style.top = '10%';
      }
    }
  }

  // 保存图标位置
  function saveIconPosition() {
    const pos = {
      left: customerServiceIcon.style.left,
      top: customerServiceIcon.style.top
    };
    localStorage.setItem('customerServiceIconPosition', JSON.stringify(pos));
  }

  // 保存对话框状态
  function saveDialogState(isOpen) {
    const state = {
      isOpen: isOpen,
      left: customerServiceDialog.style.left,
      top: customerServiceDialog.style.top,
      width: customerServiceDialog.style.width,
      height: customerServiceDialog.style.height
    };
    localStorage.setItem('customerServiceDialogState', JSON.stringify(state));
  }
});


document.head.appendChild(style);