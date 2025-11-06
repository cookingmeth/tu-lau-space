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

{{< notice "tip" >}}
**Tìm kiếm tác phẩm của bạn** bằng cách nhập tên khách hàng để xem tình trạng hiện tại
{{< /notice >}}

<div class="pottery-search-container bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-8 mb-12">
  <div class="max-w-2xl mx-auto">
    <h3 class="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
      🔍 Tìm Kiếm Tác Phẩm Gốm
    </h3>

    <!-- Search Form -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="flex-1">
          <label for="customerName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tên khách hàng
          </label>
          <input
            type="text"
            id="customerName"
            placeholder="Nhập tên để tìm kiếm..."
            class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div class="flex items-end">
          <button
            onclick="searchPottery()"
            class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center gap-2"
          >
            <i class="fa fa-search"></i>
            Tìm Kiếm
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div id="loadingState" class="text-center py-8 hidden">
      <div class="inline-flex items-center gap-3 text-blue-600">
        <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        <span>Đang tìm kiếm...</span>
      </div>
    </div>

    <!-- Search Results -->
    <div id="searchResults" class="hidden">
      <!-- Results will be populated by JavaScript -->
    </div>

    <!-- No Results -->
    <div id="noResults" class="text-center py-8 hidden">
      <div class="text-gray-500 dark:text-gray-400">
        <i class="fa fa-exclamation-triangle text-3xl mb-4"></i>
        <p class="text-lg">Không tìm thấy tác phẩm nào với tên này.</p>
        <p class="text-sm mt-2">Vui lòng kiểm tra lại tên hoặc liên hệ với chúng tôi.</p>
      </div>
    </div>

    <!-- Error State -->
    <div id="errorState" class="text-center py-8 hidden">
      <div class="text-red-500">
        <i class="fa fa-exclamation-circle text-3xl mb-4"></i>
        <p class="text-lg">Có lỗi xảy ra khi tìm kiếm.</p>
        <p class="text-sm mt-2">Vui lòng thử lại sau ít phút.</p>
      </div>
    </div>
  </div>
</div>

<!-- Custom CSS and JavaScript -->
<style>
.pottery-item {
  background: linear-gradient(135deg, #fff 0%, #f8fafc 100%);
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 16px;
  transition: all 0.3s ease;
}

.pottery-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
}

.status-pending { background: #fef3c7; color: #92400e; }
.status-in-progress { background: #dbeafe; color: #1e40af; }
.status-firing { background: #fed7d7; color: #c53030; }
.status-cooling { background: #e0e7ff; color: #5b21b6; }
.status-completed { background: #d1fae5; color: #065f46; }
.status-ready { background: #ecfccb; color: #365314; }

@media (prefers-color-scheme: dark) {
  .pottery-item {
    background: linear-gradient(135deg, #374151 0%, #4b5563 100%);
    border-color: #6b7280;
    color: #f9fafb;
  }
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

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    displayResults(data.results);

  } catch (error) {
    console.error('Search error:', error);
    showErrorState();
  }
}

function showLoadingState() {
  document.getElementById('loadingState').classList.remove('hidden');
  document.getElementById('searchResults').classList.add('hidden');
  document.getElementById('noResults').classList.add('hidden');
  document.getElementById('errorState').classList.add('hidden');
}

function showErrorState() {
  document.getElementById('loadingState').classList.add('hidden');
  document.getElementById('searchResults').classList.add('hidden');
  document.getElementById('noResults').classList.add('hidden');
  document.getElementById('errorState').classList.remove('hidden');
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
  resultsContainer.innerHTML = results.map(item => `
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

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
          <div class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Vận chuyển</div>
          <div class="text-base font-semibold">${item.shipping || 'Chưa cập nhật'}</div>
        </div>
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
          <div class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Loại Workshop</div>
          <div class="text-base font-semibold">${item.workshop_type || 'Chưa cập nhật'}</div>
        </div>
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
          <div class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Tình trạng nung</div>
          <div class="text-base">
            ${item.firing_status ?
              '<span class="text-green-600 font-semibold"><i class="fa fa-fire mr-1"></i>Đã nung</span>' :
              '<span class="text-orange-600 font-semibold"><i class="fa fa-clock mr-1"></i>Chưa nung</span>'
            }
          </div>
        </div>
      </div>

      ${item.note ? `
        <div class="bg-blue-50 dark:bg-blue-900 rounded-lg p-3 mb-4">
          <div class="text-sm font-medium text-blue-600 dark:text-blue-300 mb-1">
            <i class="fa fa-sticky-note mr-1"></i>Ghi chú
          </div>
          <div class="text-base text-blue-800 dark:text-blue-200">${item.note}</div>
        </div>
      ` : ''}

      <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-4">
        <div class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Trạng thái chi tiết</div>
        <div class="text-base">${getStatusDescription(item.status)}</div>
      </div>

      ${item.media && item.media.length > 0 ? `
        <div class="mb-4">
          <h5 class="font-medium text-gray-700 dark:text-gray-300 mb-2">
            <i class="fa fa-camera mr-2"></i>Hình ảnh & Video
          </h5>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
            ${item.media.map(media => `
              <div class="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                ${media.type === 'image' ?
                  `<img src="${media.url}" alt="Pottery progress" class="w-full h-full object-cover cursor-pointer" onclick="openMediaModal('${media.url}')">` :
                  `<div class="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600 cursor-pointer" onclick="openMediaModal('${media.url}')">
                    <i class="fa fa-play-circle text-2xl"></i>
                  </div>`
                }
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <div class="text-center">
        <button onclick="refreshStatus('${item.id}')" class="btn-sm bg-blue-100 text-blue-700 hover:bg-blue-200 px-4 py-2 rounded-lg transition-colors">
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
  return `<span class="status-badge ${statusInfo.class}">
    <i class="fa fa-${statusInfo.icon}"></i>
    ${statusInfo.text}
  </span>`;
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
document.getElementById('customerName').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    searchPottery();
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