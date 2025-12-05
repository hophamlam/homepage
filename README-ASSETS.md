# Hướng dẫn sử dụng Assets từ repo cũ

## Cách 1: Download về (Khuyến khích) ✅

### Bước 1: Clone repo cũ tạm thời
```bash
cd /tmp
git clone https://github.com/hophamlam/homepage.git homepage-old
```

### Bước 2: Copy assets và static files
```bash
# Copy assets
cp -r homepage-old/assets/* homepage-astro-shadcn/public/assets/

# Copy static files
cp -r homepage-old/static/* homepage-astro-shadcn/public/static/

# Cleanup
rm -rf homepage-old
```

### Bước 3: Sử dụng trong code
```astro
<!-- Trong Astro component -->
<img src="/assets/icon.svg" alt="Icon" />
<link rel="icon" href="/static/favicon.ico" />
```

## Cách 2: Dùng trực tiếp từ GitHub (Không khuyến khích) ⚠️

Có thể dùng GitHub raw URLs nhưng **không khuyến khích** vì:
- Phụ thuộc vào GitHub (có thể bị rate limit)
- Không tối ưu cho production
- CORS issues có thể xảy ra
- Chậm hơn so với local files

### Ví dụ (không khuyến khích):
```astro
<img src="https://github.com/hophamlam/homepage/raw/master/assets/icon.svg" />
```

## Cách 3: Dùng jsDelivr CDN (Tùy chọn)

Nếu muốn dùng CDN, có thể dùng jsDelivr:
```astro
<img src="https://cdn.jsdelivr.net/gh/hophamlam/homepage@master/assets/icon.svg" />
```

**Lưu ý:** Vẫn phụ thuộc vào external service.

## Best Practice

✅ **Nên làm:** Download về và đặt trong `public/`
- Tự chủ, không phụ thuộc
- Tối ưu cho production
- Astro sẽ tự động copy vào build output
- Nhanh và ổn định

❌ **Không nên:** Dùng trực tiếp từ GitHub
- Phụ thuộc external
- Có thể bị lỗi
- Không tối ưu

