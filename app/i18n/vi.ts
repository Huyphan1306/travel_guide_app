const vi = {
  common: {
    ok: "OK!",
    cancel: "Huỷ",
    back: "Quay lại",
    validateRequire: "Phần này không thể để trống",
    resultSearchIsEmpty: "Không có kết quả tìm kiếm",
    newsOfCatogeryIsEmpty: "Hiện không có bài viết về chủ đề này",
  },
  welcomeScreen: {
    postscript:
      "psst  — This probably isn't what your app looks like. (Unless your designer handed you these screens, and in that case, ship it!)",
    readyForLaunch: "Your app, almost ready for launch!",
    exciting: "(ohh, this is exciting!)",
  },
  errorScreen: {
    title: "Something went wrong!",
    friendlySubtitle:
      "This is the screen that your users will see in production when an error is thrown. You'll want to customize this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you want to remove this entirely, check `app/app.tsx` for the <ErrorBoundary> component.",
    reset: "RESET APP",
  },
  emptyStateComponent: {
    generic: {
      heading: "So empty... so sad",
      content: "No data found yet. Try clicking the button to refresh or reload the app.",
      button: "Let's try this again",
    },
  },
  makeNews: {
    makeNews: "Thêm tin",
    title: "Tiêu đề bài viết",
    titleFieldPlaceholder: "Nhập tiêu đề",
    content: "Nội dung",
    imageUrl: "Đường dẫn hình ảnh",
    category: "Danh mục",
    sub_categories: "Danh mục con",
    mapUrl: "Đường dẫn bản đồ",
    subTitle: "Tiêu đề con",
    videoUrl: "Đường dẫn video",
    htmlContent: "Nội dung HTML",
    phoneNumber: "Số điện thoại liên hệ",
    breakingNews: "Tin nóng",
    selectPlaceholder: "--Chọn danh mục--",
  },
  tourism: {
    culture: "Văn Hoá",
    craftVillage: "Làng Nghề",
    nature: "Thiên Nhiên",
    architecture: "Kiến Trúc",
    other: "Khác",
  },
  experience: {
    sport: "Thể Thao",
    cuisine: "Ẩm Thực",
    shopping: "Mua Sắm",
    entertainment: "Giải Trí",
    accommodation: "Nơi ở",
  },
  support: {
    medical: "Y Tế",
    driver: "Di Chuyển",
    finance: "Tài Chính",
    media: "Truyền Thông",
    other: "Khác",
  },
  adminListNews: {
    title: "Danh sách bài viết",
  },
  categoryTitle: { tourism: "Điểm du lịch", experience: "Trải nghiệm", support: "Hỗ trợ" },
}

export default vi
export type Translations = typeof vi
