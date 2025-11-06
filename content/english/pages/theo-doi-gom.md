---
title: "Theo Dõi Gốm - Pottery Tracking"
meta_title: "Theo Dõi Gốm - Quy Trình Nung Gốm Tại Từ Lâu Space"
description: "Khám phá toàn bộ quy trình nung gốm từ đất sét thành tác phẩm hoàn thiện tại Từ Lâu Space. Theo dõi từng bước chi tiết của hành trình tạo nên những tác phẩm gốm độc đáo."
date: 2024-04-15T05:00:00Z
image: "/images/workshop-pottery.jpg"
draft: false
---

{{< toc >}}

## Giới Thiệu Về Theo Dõi Gốm

Tại Từ Lâu Space, chúng tôi tin rằng mỗi tác phẩm gốm đều có một câu chuyện riêng. Từ những cục đất sét thô ráp ban đầu cho đến những tác phẩm tinh xảo cuối cùng, mỗi bước trong quy trình đều mang ý nghĩa đặc biệt.

**Theo Dõi Gốm** là dịch vụ độc đáo của chúng tôi, cho phép bạn:
- 📸 Ghi lại toàn bộ hành trình tạo tác
- 🔥 Theo dõi quá trình nung lò chi tiết
- 📊 Cập nhật thường xuyên về tình trạng tác phẩm
- 🎯 Nhận thông báo khi tác phẩm hoàn thành

---

## Tra Cứu Tình Trạng Tác Phẩm

<div class="pottery-tracking-hero bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl p-8 md:p-12 mb-12 border border-amber-200 dark:border-gray-700">
<div class="max-w-4xl mx-auto text-center">
<div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full mb-6 shadow-lg">
<i class="fa fa-search text-white text-2xl"></i>
</div>
<h2 class="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
Theo Dõi Tác Phẩm Của Bạn
</h2>
<p class="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
Nhập tên khách hàng để xem tình trạng hiện tại của tác phẩm gốm.
Từ việc tạo hình đến hoàn thiện, chúng tôi theo dõi từng bước một cách chi tiết.
</p>
</div>
</div>

<!-- Enhanced Search Form -->
<div class="search-form-container bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 md:p-8 border border-gray-200 dark:border-gray-700 mx-auto max-w-4xl mb-12">
<div class="flex flex-col lg:flex-row gap-4 items-end">
<div class="flex-1">
<label for="customerName" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
<i class="fa fa-user mr-2 text-amber-500"></i>Tên Khách Hàng
</label>
<div class="relative">
<input
type="text"
id="customerName"
placeholder="VD: Nguyễn Văn A, Trần Thị B..."
class="search-input w-full px-4 py-4 pl-12 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-700 dark:text-white text-lg transition-all duration-200 shadow-sm"
/>
<i class="fa fa-user absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
</div>
</div>
<div class="w-full lg:w-auto">
<button
onclick="searchPottery()"
class="search-button w-full lg:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-lg transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1 min-w-[160px]"
>
<i class="fa fa-search text-lg"></i>
<span class="text-lg">Tìm Kiếm</span>
</button>
</div>
</div>

<!-- Quick Search Tips -->
<div class="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
<div class="flex items-center gap-2 text-amber-700 dark:text-amber-300">
<i class="fa fa-lightbulb"></i>
<span class="font-semibold">Mẹo tìm kiếm:</span>
</div>
<p class="text-sm text-amber-600 dark:text-amber-400 mt-1">
Nhập tên đầy đủ hoặc một phần tên để tìm kiếm chính xác hơn
</p>
</div>
</div>

<div class="search-results-container max-w-6xl mx-auto">

  <!-- Loading State -->
  <div id="loadingState" class="text-center py-12 hidden">
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 max-w-md mx-auto">
      <div class="animate-spin rounded-full h-12 w-12 border-4 border-amber-200 border-t-amber-500 mx-auto mb-4"></div>
      <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Đang tìm kiếm...</h3>
      <p class="text-gray-600 dark:text-gray-300">Vui lòng chờ trong giây lát</p>
    </div>
  </div>

  <!-- Search Results -->
  <div id="searchResults" class="hidden space-y-6">
    <!-- Results will be populated by JavaScript -->
  </div>

  <!-- No Results -->
  <div id="noResults" class="text-center py-12 hidden">
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 max-w-md mx-auto">
      <div class="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
        <i class="fa fa-search-minus text-2xl text-gray-400"></i>
      </div>
      <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Không tìm thấy kết quả</h3>
      <p class="text-gray-600 dark:text-gray-300 mb-4">Không có tác phẩm nào với tên này trong hệ thống.</p>
      <div class="text-sm text-gray-500 dark:text-gray-400">
        <p>• Kiểm tra lại tên khách hàng</p>
        <p>• Thử tìm kiếm với tên khác</p>
        <p>• Liên hệ với chúng tôi để được hỗ trợ</p>
      </div>
    </div>
  </div>

  <!-- Error State -->
  <div id="errorState" class="text-center py-12 hidden">
    <div class="bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800 p-8 max-w-md mx-auto">
      <div class="w-16 h-16 bg-red-100 dark:bg-red-800/30 rounded-full flex items-center justify-center mx-auto mb-4">
        <i class="fa fa-exclamation-circle text-2xl text-red-500"></i>
      </div>
      <h3 class="text-lg font-semibold text-red-800 dark:text-red-300 mb-2">Có lỗi xảy ra</h3>
      <p class="text-red-600 dark:text-red-400 mb-4">Không thể kết nối đến hệ thống theo dõi.</p>
      <button
        onclick="searchPottery()"
        class="px-4 py-2 bg-red-100 hover:bg-red-200 dark:bg-red-800 dark:hover:bg-red-700 text-red-700 dark:text-red-300 rounded-lg transition-colors"
      >
        Thử lại
      </button>
    </div>
  </div>
</div>

<!-- Custom CSS and JavaScript -->
<style>
/* Pottery tracking result cards */
.pottery-item {
  background: linear-gradient(135deg, #ffffff 0%, #fafafa 100%);
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 24px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  margin-bottom: 0;
}

.pottery-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #f59e0b 0%, #ef4444 50%, #8b5cf6 100%);
}

.pottery-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border-color: #d1d5db;
}

/* Enhanced status badges */
.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 25px;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

/* Status colors with better contrast and modern design */
.status-pending { background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); color: #92400e; border: 1px solid #f59e0b; }
.status-shaping { background: linear-gradient(135deg, #ddd6fe 0%, #c4b5fd 100%); color: #5b21b6; border: 1px solid #8b5cf6; }
.status-drying { background: linear-gradient(135deg, #fecaca 0%, #fca5a5 100%); color: #991b1b; border: 1px solid #ef4444; }
.status-decorating { background: linear-gradient(135deg, #a7f3d0 0%, #6ee7b7 100%); color: #065f46; border: 1px solid #10b981; }
.status-firing { background: linear-gradient(135deg, #fed7d7 0%, #fca5a5 100%); color: #991b1b; border: 1px solid #ef4444; }
.status-cooling { background: linear-gradient(135deg, #dbeafe 0%, #93c5fd 100%); color: #1e40af; border: 1px solid #3b82f6; }
.status-completed { background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%); color: #065f46; border: 1px solid #10b981; }
.status-ready { background: linear-gradient(135deg, #ecfccb 0%, #d9f99d 100%); color: #365314; border: 1px solid #65a30d; }
.status-in-progress { background: linear-gradient(135deg, #dbeafe 0%, #93c5fd 100%); color: #1e40af; border: 1px solid #3b82f6; }

/* Info cards styling */
.info-card {
  background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 16px;
  transition: all 0.2s ease;
}

.info-card:hover {
  background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%);
  border-color: #d1d5db;
  transform: translateY(-1px);
}

/* Info card icons */
.info-card-icon {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
}

/* Enhanced search form styling */
.search-form-container {
  max-width: 100% !important;
  width: 100%;
}

.search-input {
  font-size: 16px !important;
  line-height: 1.5;
  height: auto !important;
  min-height: 56px;
}

.search-button {
  height: 56px !important;
  min-height: 56px;
  white-space: nowrap;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .search-form-container {
    padding: 1rem !important;
  }

  .search-input {
    font-size: 16px !important;
    padding: 12px 16px 12px 48px !important;
  }

  .search-button {
    margin-top: 1rem;
    width: 100% !important;
  }
}

/* Media gallery improvements */
.media-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
  margin-top: 16px;
}

.media-item {
  aspect-ratio: 1;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid #e5e7eb;
  transition: all 0.3s ease;
  cursor: pointer;
}

.media-item:hover {
  border-color: #f59e0b;
  transform: scale(1.05);
  box-shadow: 0 8px 25px -5px rgba(0, 0, 0, 0.1);
}

/* Dark mode enhancements */
.dark .pottery-item {
  background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
  border-color: #4b5563;
  color: #f9fafb;
}

.dark .pottery-item:hover {
  border-color: #6b7280;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
}

.dark .info-card {
  background: linear-gradient(135deg, #374151 0%, #4b5563 100%);
  border-color: #6b7280;
}

.dark .info-card:hover {
  background: linear-gradient(135deg, #4b5563 0%, #6b7280 100%);
  border-color: #9ca3af;
}

.dark .media-item {
  border-color: #6b7280;
}

.dark .media-item:hover {
  border-color: #f59e0b;
}

.dark .search-form-container {
  background: #1f2937 !important;
  border-color: #4b5563 !important;
}

.dark .search-input {
  background: #374151 !important;
  border-color: #4b5563 !important;
  color: #f9fafb !important;
}

.dark .search-input::placeholder {
  color: #9ca3af !important;
}

/* Animation for result appearance */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.pottery-item {
  animation: slideInUp 0.5s ease-out;
}
</style>

<script>
async function searchPottery() {
  const nameInput = document.getElementById('customerName');
  const name = nameInput.value.trim();

  if (!name) {
    alert('Vui lòng nhập tên để tìm kiếm');
    return;
  }

  // Show loading state
  showLoadingState();

  try {
    // Call Netlify Function API endpoint
    const response = await fetch('/.netlify/functions/pottery-search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('API error:', data);
      showErrorState(data.message || data.error || 'Có lỗi xảy ra khi tìm kiếm');
      return;
    }

    if (data.success && data.results) {
      displayResults(data.results);
    } else {
      console.error('Invalid response format:', data);
      showErrorState('Định dạng dữ liệu không hợp lệ');
    }

  } catch (error) {
    console.error('Search error:', error);
    showErrorState('Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng.');
  }
}

function showLoadingState() {
  document.getElementById('loadingState').classList.remove('hidden');
  document.getElementById('searchResults').classList.add('hidden');
  document.getElementById('noResults').classList.add('hidden');
  document.getElementById('errorState').classList.add('hidden');
}

function showErrorState(message) {
  document.getElementById('loadingState').classList.add('hidden');
  document.getElementById('searchResults').classList.add('hidden');
  document.getElementById('noResults').classList.add('hidden');
  document.getElementById('errorState').classList.remove('hidden');

  // Update error message if provided
  if (message) {
    const errorMessageElement = document.querySelector('#errorState p');
    if (errorMessageElement) {
      errorMessageElement.textContent = message;
    }
  }
}

function displayResults(results) {
  document.getElementById('loadingState').classList.add('hidden');
  document.getElementById('errorState').classList.add('hidden');

  if (!results || results.length === 0) {
    document.getElementById('noResults').classList.remove('hidden');
    document.getElementById('searchResults').classList.add('hidden');
    return;
  }

  document.getElementById('noResults').classList.add('hidden');
  document.getElementById('searchResults').classList.remove('hidden');

  const resultsContainer = document.getElementById('searchResults');
  // Show only the first (most relevant) result
  resultsContainer.innerHTML = results.slice(0, 1).map(item => `
    <div class="pottery-item">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
        <div>
          <h4 class="text-xl font-bold text-gray-800 dark:text-white mb-2">
            👤 ${item.name}
          </h4>
          <div class="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
            <span><i class="fa fa-calendar mr-1"></i> ${formatDate(item.date)}</span>
            <span><i class="fa fa-box mr-1"></i> ${item.products} sản phẩm</span>
          </div>
        </div>
        <div class="mt-3 lg:mt-0">
          ${getStatusBadge(item.status)}
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div class="info-card">
          <div class="flex items-center gap-2 mb-2">
            <span class="info-card-icon bg-blue-500"></span>
            <div class="text-sm font-semibold text-gray-700 dark:text-gray-300">Vận chuyển</div>
          </div>
          <div class="text-base font-bold text-gray-800 dark:text-white">${item.shipping || 'Chưa cập nhật'}</div>
        </div>
        <div class="info-card">
          <div class="flex items-center gap-2 mb-2">
            <span class="info-card-icon bg-purple-500"></span>
            <div class="text-sm font-semibold text-gray-700 dark:text-gray-300">Loại Workshop</div>
          </div>
          <div class="text-base font-bold text-gray-800 dark:text-white">${item.workshop_type || 'Chưa cập nhật'}</div>
        </div>
        <div class="info-card">
          <div class="flex items-center gap-2 mb-2">
            <span class="info-card-icon bg-orange-500"></span>
            <div class="text-sm font-semibold text-gray-700 dark:text-gray-300">Tình trạng nung</div>
          </div>
          <div class="text-base font-bold">
            ${item.firing_status ?
              '<span class="text-green-600 dark:text-green-400"><i class="fa fa-fire mr-2"></i>Đã nung</span>' :
              '<span class="text-orange-600 dark:text-orange-400"><i class="fa fa-clock mr-2"></i>Chưa nung</span>'
            }
          </div>
        </div>
      </div>

      ${item.note ? `
        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-lg p-4 mb-6 border border-blue-200 dark:border-blue-700">
          <div class="flex items-center gap-2 text-blue-600 dark:text-blue-300 mb-2">
            <i class="fa fa-sticky-note"></i>
            <span class="font-semibold">Ghi chú quan trọng</span>
          </div>
          <div class="text-blue-800 dark:text-blue-200 leading-relaxed">${item.note}</div>
        </div>
      ` : ''}

      <div class="info-card mb-6">
        <div class="flex items-center gap-2 mb-2">
          <span class="info-card-icon bg-gray-500"></span>
          <div class="text-sm font-semibold text-gray-700 dark:text-gray-300">Trạng thái chi tiết</div>
        </div>
        <div class="text-base text-gray-700 dark:text-gray-300">${getStatusDescription(item.status)}</div>
      </div>

      ${item.media && item.media.length > 0 ? `
        <div class="mb-6">
          <div class="flex items-center gap-2 mb-4">
            <span class="info-card-icon bg-green-500"></span>
            <h5 class="font-semibold text-gray-700 dark:text-gray-300">Hình ảnh & Video tiến độ</h5>
          </div>
          <div class="media-gallery">
            ${item.media.map(media =>
              '<div class="media-item">' +
                (media.type === 'image' ?
                  '<img src="' + media.url + '" alt="Pottery progress" class="w-full h-full object-cover" onclick="openMediaModal(\'' + media.url + '\')">' :
                  '<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600" onclick="openMediaModal(\'' + media.url + '\')">' +
                    '<i class="fa fa-play-circle text-3xl"></i>' +
                  '</div>'
                ) +
              '</div>'
            ).join('')}
          </div>
        </div>
      ` : ''}

      <div class="text-center pt-4 border-t border-gray-200 dark:border-gray-600">
        <button onclick="refreshStatus('${item.id}')" class="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg">
          <i class="fa fa-refresh mr-2"></i>Cập nhật mới nhất
        </button>
      </div>
    </div>
  `).join('');
}

function getStatusBadge(status) {
  const statusMap = {
    'pending': { text: 'Chờ xử lý', class: 'status-pending', icon: 'clock' },
    'shaping': { text: 'Đang tạo hình', class: 'status-in-progress', icon: 'hands' },
    'drying': { text: 'Đang phơi khô', class: 'status-in-progress', icon: 'sun' },
    'decorating': { text: 'Đang trang trí', class: 'status-in-progress', icon: 'paint-brush' },
    'firing': { text: 'Đang nung lò', class: 'status-firing', icon: 'fire' },
    'cooling': { text: 'Đang làm nguội', class: 'status-cooling', icon: 'snowflake' },
    'completed': { text: 'Hoàn thành', class: 'status-completed', icon: 'check-circle' },
    'ready': { text: 'Sẵn sàng nhận', class: 'status-ready', icon: 'gift' }
  };

  const statusInfo = statusMap[status] || { text: status, class: 'status-pending', icon: 'info' };
  return '<span class="status-badge ' + statusInfo.class + '">' +
    '<i class="fa fa-' + statusInfo.icon + '"></i>' +
    statusInfo.text +
  '</span>';
}

function getStatusDescription(status) {
  const descriptions = {
    'pending': 'Tác phẩm đang trong hàng đợi xử lý',
    'shaping': 'Nghệ nhân đang tạo hình từ đất sét',
    'drying': 'Tác phẩm đang được phơi khô tự nhiên',
    'decorating': 'Đang vẽ và trang trí hoa văn',
    'firing': 'Đang nung trong lò ở nhiệt độ cao',
    'cooling': 'Chờ lò nguội để lấy sản phẩm ra',
    'completed': 'Tác phẩm đã hoàn thành xong',
    'ready': 'Có thể đến nhận hoặc giao hàng'
  };
  return descriptions[status] || 'Đang cập nhật trạng thái';
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN');
}

function openMediaModal(url) {
  // Open media in a modal or new tab
  window.open(url, '_blank');
}

function refreshStatus(itemId) {
  // Refresh individual item status
  alert('Đang cập nhật trạng thái mới nhất...');
  // You can implement real-time refresh here
}

// Allow Enter key to trigger search
// Ensure DOM is ready before attaching event listeners
document.addEventListener('DOMContentLoaded', function() {
  const customerNameInput = document.getElementById('customerName');
  if (customerNameInput) {
    customerNameInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        searchPottery();
      }
    });
  }
});
</script>

---

## Quy Trình Nung Gốm Chi Tiết

### Bước 1: Tạo Hình & Phơi Khô
**Thời gian: 1-2 ngày**

{{< notice "info" >}}
**Giai đoạn đầu tiên** trong hành trình từ đất sét thành tác phẩm nghệ thuật
{{< /notice >}}

- **Tạo hình**: Nặn và tạo dáng theo ý tưởng
- **Kiểm tra độ ẩm**: Đảm bảo độ ẩm phù hợp
- **Phơi khô tự nhiên**: Để tác phẩm khô từ từ, tránh nứt
- **Chỉnh sửa**: Hoàn thiện chi tiết cuối cùng

**Cập nhật theo dõi:**
- Ảnh tác phẩm sau khi tạo hình
- Đánh giá chất lượng đất sét
- Dự kiến thời gian phơi khô

### Bước 2: Trang Trí & Vẽ Hoa Văn
**Thời gian: 2-3 ngày**

- **Thiết kế hoa văn**: Phác thảo ý tưởng trang trí
- **Vẽ chi tiết**: Sử dụng các loại nước men và màu
- **Kiểm tra chất lượng**: Đảm bảo màu sắc đều và đẹp
- **Phơi khô lần 2**: Để màu và hoa văn ổn định

**Cập nhật theo dõi:**
- Video quá trình vẽ hoa văn
- Ảnh before/after của trang trí
- Thông tin về loại màu và kỹ thuật sử dụng

### Bước 3: Nung Lò Lần Đầu (Bisque Firing)
**Thời gian: 12-16 giờ**
**Nhiệt độ: 900-1000°C**

{{< notice "warning" >}}
**Giai đoạn quan trọng** - Tác phẩm sẽ biến đổi từ đất sét thành gốm
{{< /notice >}}

- **Chuẩn bị lò**: Sắp xếp tác phẩm trong lò nung
- **Kiểm soát nhiệt độ**: Tăng nhiệt độ từ từ theo chu trình
- **Theo dõi 24/7**: Giám sát liên tục trong suốt quá trình
- **Làm nguội**: Để lò nguội tự nhiên sau khi nung xong

**Cập nhật theo dõi:**
- Biểu đồ nhiệt độ thời gian thực
- Ảnh tác phẩm trước khi vào lò
- Thông báo các mốc nhiệt độ quan trọng
- Video quá trình mở lò sau khi nguội

### Bước 4: Tráng Men & Hoàn Thiện
**Thời gian: 1-2 ngày**

- **Chọn loại men**: Tùy theo hiệu ứng mong muốn
- **Tráng men đều**: Đảm bảo lớp men phủ đều khắp bề mặt
- **Kiểm tra chi tiết**: Loại bỏ men thừa ở chân đế
- **Chuẩn bị nung lần 2**: Sắp xếp trong lò cho lần nung cuối

### Bước 5: Nung Lò Lần Cuối (Glaze Firing)
**Thời gian: 10-14 giờ**
**Nhiệt độ: 1200-1300°C**

{{< notice "success" >}}
**Giai đoạn hoàn thiện** - Tác phẩm sẽ có màu sắc và độ bóng cuối cùng
{{< /notice >}}

- **Nung ở nhiệt độ cao**: Để men chín và tạo độ bóng
- **Kiểm soát khí quyển lò**: Đảm bảo điều kiện nung tối ưu
- **Theo dõi màu sắc**: Men sẽ thay đổi màu theo nhiệt độ
- **Hoàn thành**: Tác phẩm đạt độ cứng và màu sắc cuối cùng

**Cập nhật theo dõi:**
- Ảnh tác phẩm hoàn thành
- So sánh before/after toàn bộ quá trình
- Video mở lò và lấy tác phẩm
- Thông báo sẵn sàng nhận

---

## Công Nghệ Theo Dõi

### Hệ Thống Giám Sát Lò Nung

🌡️ **Cảm biến nhiệt độ chính xác**
- Theo dõi nhiệt độ với độ chính xác ±5°C
- Cập nhật mỗi 15 phút
- Lưu trữ dữ liệu cho từng mẻ nung

📊 **Dashboard theo dõi trực tuyến**
- Xem biểu đồ nhiệt độ thời gian thực
- Nhận thông báo qua email/SMS
- Lịch sử chi tiết của tác phẩm

📱 **Ứng dụng mobile**
- Cập nhật tiến độ mọi lúc mọi nơi
- Album ảnh riêng cho từng tác phẩm
- Chat trực tiếp với nghệ nhân

### Quy Trình Chụp Ảnh & Video

- **Ảnh chất lượng cao**: Canon DSLR cho từng giai đoạn
- **Video time-lapse**: Ghi lại quá trình nung lò
- **Macro photography**: Chi tiết hoa văn và kết cấu
- **Before/After comparison**: So sánh rõ nét từng bước

---

## Gói Dịch Vụ Theo Dõi

### 🥉 Gói Cơ Bản
**299,000 VNĐ**
- 5 ảnh cập nhật chính
- Thông báo SMS khi hoàn thành
- Báo cáo tóm tắt quy trình

### 🥈 Gói Tiêu Chuẩn
**599,000 VNĐ**
- 15 ảnh chi tiết từng bước
- 3 video time-lapse ngắn
- Biểu đồ nhiệt độ chi tiết
- Thông báo email theo thời gian thực

### 🥇 Gói Premium
**999,000 VNĐ**
- Chụp ảnh không giới hạn
- Video đầy đủ toàn bộ quá trình
- Album online cá nhân hóa
- Chat 1-on-1 với nghệ nhân
- Livestream quá trình nung lò

{{< notice "tip" >}}
**Ưu đãi đặc biệt**: Đặt 3 tác phẩm cùng lúc, giảm 20% phí theo dõi!
{{< /notice >}}

---

## Câu Hỏi Thường Gặp

{{< accordion "Tôi có thể hủy dịch vụ theo dõi không?" >}}
Có, bạn có thể hủy dịch vụ theo dõi trước khi bắt đầu nung lò lần đầu. Phí sẽ được hoàn lại 80% nếu hủy trước 24h.
{{< /accordion >}}

{{< accordion "Tôi có nhận được tác phẩm nếu bị lỗi trong quá trình nung?" >}}
Chúng tôi cam kết bồi thường 100% nếu lỗi do quy trình nung không đúng cách. Nếu tác phẩm bị nứt do cấu trúc đất sét, chúng tôi sẽ hỗ trợ làm lại với 50% chi phí.
{{< /accordion >}}

{{< accordion "Thời gian nung gốm có thể thay đổi không?" >}}
Có, thời gian có thể thay đổi tùy thuộc vào thời tiết, loại đất sét và kích thước tác phẩm. Chúng tôi sẽ thông báo cập nhật nếu có thay đổi.
{{< /accordion >}}

{{< accordion "Tôi có thể yêu cầu thêm ảnh hoặc video không?" >}}
Có, bạn có thể yêu cầu thêm ảnh/video với phí bổ sung 50,000 VNĐ/ảnh hoặc 150,000 VNĐ/video 30 giây.
{{< /accordion >}}

---

## Đăng Ký Dịch Vụ

Sẵn sàng theo dõi hành trình tạo nên tác phẩm gốm của bạn?

{{< button label="Đặt Lịch Ngay" link="/booking-pricing" style="solid" >}}

**Hoặc liên hệ trực tiếp:**
- 📞 **Hotline**: 0123 456 789
- 📧 **Email**: hello@tulau.space
- 💬 **Facebook**: @tulauspace
- 📍 **Địa chỉ**: 7 Phan Tây Hồ, Phường Cầu Kiệu, TP.HCM

---

*Từ Lâu Space - Nơi mỗi tác phẩm gốm đều có một câu chuyện đáng nhớ* ✨