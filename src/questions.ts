export type Difficulty = 'Dễ' | 'Trung bình' | 'Khó';
export type Subject = 'Toán' | 'Tiếng Việt' | 'Tự nhiên & Xã hội' | 'Lịch sử & Địa lý';

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswerIndex: number;
  difficulty: Difficulty;
  subject: Subject;
}

const rawQuestions: Omit<Question, 'id'>[] = [
  // --- MỨC ĐỘ DỄ ---
  { text: "Số 'Bảy mươi hai nghìn không trăm mười lăm' viết là gì?", options: ["72015", "720015", "70215", "72150"], correctAnswerIndex: 0, difficulty: "Dễ", subject: "Toán" },
  { text: "Kết quả của phép tính 120 × 4 là:", options: ["480", "408", "440", "420"], correctAnswerIndex: 0, difficulty: "Dễ", subject: "Toán" },
  { text: "Từ nào đồng nghĩa với từ 'Chăm chỉ'?", options: ["Lười biếng", "Siêng năng", "Hiền lành", "Thông minh"], correctAnswerIndex: 1, difficulty: "Dễ", subject: "Tiếng Việt" },
  { text: "Bộ phận nào của cây làm nhiệm vụ hút nước và chất khoáng?", options: ["Lá", "Thân", "Rễ", "Hoa"], correctAnswerIndex: 2, difficulty: "Dễ", subject: "Tự nhiên & Xã hội" },
  { text: "Hình vuông có cạnh 6m. Chu vi của hình vuông là bao nhiêu?", options: ["24m", "36m", "12m", "18m"], correctAnswerIndex: 0, difficulty: "Dễ", subject: "Toán" },
  { text: "Ở nước ta, thủ đô tên là gì?", options: ["Đà Nẵng", "Huế", "Hà Nội", "Hồ Chí Minh"], correctAnswerIndex: 2, difficulty: "Dễ", subject: "Lịch sử & Địa lý" },
  { text: "Trong câu 'Đàn ong hút mật', từ nào là động từ?", options: ["Đàn", "ong", "hút", "mật"], correctAnswerIndex: 2, difficulty: "Dễ", subject: "Tiếng Việt" },
  { text: "Phép chia 450 : 9 có kết quả là:", options: ["40", "50", "45", "60"], correctAnswerIndex: 1, difficulty: "Dễ", subject: "Toán" },
  { text: "Dấu chấm hỏi (?) được dùng để làm gì?", options: ["Kết thúc câu kể", "Kết thúc câu hỏi", "Cảm thán", "Mô tả"], correctAnswerIndex: 1, difficulty: "Dễ", subject: "Tiếng Việt" },
  { text: "Khí nào cần thiết cho sự sống của con người?", options: ["Khí Oxy (Ô-xi)", "Khí Ni-tơ", "Khí Cacbonic", "Khí Hi-đrô"], correctAnswerIndex: 0, difficulty: "Dễ", subject: "Tự nhiên & Xã hội" },
  ...Array.from({length: 40}).map((_, i) => {
    let a = Math.floor(Math.random() * 90) + 10;
    let b = Math.floor(Math.random() * 5) + 2;
    let ops = [a*b, a*b+10, a*b-10, a*b+5].sort();
    return {
      text: `Kết quả của phép tính ${a} × ${b} là:`,
      options: ops.map(String),
      correctAnswerIndex: ops.indexOf(a*b),
      difficulty: "Dễ" as Difficulty,
      subject: "Toán" as Subject
    };
  }),
  { text: "Hành tinh nào gần Mặt Trời nhất?", options: ["Sao Kim", "Sao Thủy", "Trái Đất", "Sao Hỏa"], correctAnswerIndex: 1, difficulty: "Dễ", subject: "Tự nhiên & Xã hội" },
  { text: "Nhà nước đầu tiên của nước ta tên là gì?", options: ["Âu Lạc", "Văn Lang", "Đại Việt", "Đại Ngu"], correctAnswerIndex: 1, difficulty: "Dễ", subject: "Lịch sử & Địa lý" },
  { text: "Hai Bà Trưng cưỡi con vật gì khi ra trận?", options: ["Ngựa", "Voi", "Trâu", "Rồng"], correctAnswerIndex: 1, difficulty: "Dễ", subject: "Lịch sử & Địa lý" },
  { text: "Để bảo vệ răng, ta cần đánh răng ít nhất mấy lần một ngày?", options: ["1 lần", "2 lần", "3 lần", "Không cần"], correctAnswerIndex: 1, difficulty: "Dễ", subject: "Tự nhiên & Xã hội" },
  { text: "Trong bảng đơn vị đo khối lượng, 1kg bằng bao nhiêu gam?", options: ["10g", "100g", "1000g", "10000g"], correctAnswerIndex: 2, difficulty: "Dễ", subject: "Toán" },
  
  // --- MỨC ĐỘ TRUNG BÌNH ---
  { text: "Năm 938, Ngô Quyền đánh bại quân Nam Hán trên sông nào?", options: ["Sông Hồng", "Sông Bạch Đằng", "Sông Cửu Long", "Sông Lô"], correctAnswerIndex: 1, difficulty: "Trung bình", subject: "Lịch sử & Địa lý" },
  { text: "Phân số 1/2 bằng phân số nào dưới đây?", options: ["2/4", "3/5", "4/6", "1/4"], correctAnswerIndex: 0, difficulty: "Trung bình", subject: "Toán" },
  { text: "Từ nào là từ láy trong các từ sau?", options: ["Bức tranh", "Rì rào", "Học sinh", "Khung cửa"], correctAnswerIndex: 1, difficulty: "Trung bình", subject: "Tiếng Việt" },
  { text: "Thức ăn chia làm mấy nhóm chất dinh dưỡng chính?", options: ["2 nhóm", "3 nhóm", "4 nhóm", "5 nhóm"], correctAnswerIndex: 2, difficulty: "Trung bình", subject: "Tự nhiên & Xã hội" },
  { text: "Hình chữ nhật có chiều dài 12m, chiều rộng 5m. Diện tích là:", options: ["60m2", "34m2", "17m2", "50m2"], correctAnswerIndex: 0, difficulty: "Trung bình", subject: "Toán" },
  { text: "Tác giả bài thơ 'Truyện Kiều' là ai?", options: ["Nguyễn Trãi", "Nguyễn Du", "Hồ Xuân Hương", "Tố Hữu"], correctAnswerIndex: 1, difficulty: "Trung bình", subject: "Tiếng Việt" },
  { text: "Màu cờ Tổ quốc Việt Nam có nền và ngôi sao màu gì?", options: ["Nền đỏ, sao vàng", "Nền vàng, sao đỏ", "Nền xanh, sao vàng", "Nền trắng, sao đỏ"], correctAnswerIndex: 0, difficulty: "Trung bình", subject: "Tự nhiên & Xã hội" },
  { text: "1 thế kỉ gồm bao nhiêu năm?", options: ["10 năm", "100 năm", "1000 năm", "1 triệu năm"], correctAnswerIndex: 1, difficulty: "Trung bình", subject: "Toán" },
  { text: "Từ nào viết đúng chính tả?", options: ["Xáng xủa", "Sáng sủa", "Xáng sủa", "Sáng xủa"], correctAnswerIndex: 1, difficulty: "Trung bình", subject: "Tiếng Việt" },
  { text: "Ở giai đoạn nào, sâu bướm phá hoại mùa màng nhiều nhất?", options: ["Trứng", "Sâu", "Nhộng", "Bướm"], correctAnswerIndex: 1, difficulty: "Trung bình", subject: "Tự nhiên & Xã hội" },
  ...Array.from({length: 40}).map((_, i) => {
    let a = Math.floor(Math.random() * 50) + 20;
    let b = Math.floor(Math.random() * 20) + 10;
    let ops = [a*b, a*b+100, a*b-50, a*b+10].sort();
    return {
      text: `Tính: ${a} × ${b} = ?`,
      options: ops.map(String),
      correctAnswerIndex: ops.indexOf(a*b),
      difficulty: "Trung bình" as Difficulty,
      subject: "Toán" as Subject
    };
  }),
  { text: "Đinh Bộ Lĩnh đã dẹp loạn mấy sứ quân?", options: ["10 sứ quân", "11 sứ quân", "12 sứ quân", "13 sứ quân"], correctAnswerIndex: 2, difficulty: "Trung bình", subject: "Lịch sử & Địa lý" },
  { text: "Đội viên Đội Thiếu niên Tiền phong quàng khăn màu gì?", options: ["Xanh dương", "Đỏ", "Vàng", "Trắng"], correctAnswerIndex: 1, difficulty: "Trung bình", subject: "Tự nhiên & Xã hội" },
  { text: "Đỉnh núi nào được mệnh danh là 'Nóc nhà Đông Dương'?", options: ["Fansipan", "Bạch Mã", "Ngọc Linh", "Tây Côn Lĩnh"], correctAnswerIndex: 0, difficulty: "Trung bình", subject: "Lịch sử & Địa lý" },
  { text: "Câu lạc bộ múa bắt đầu lúc 14 giờ 30 phút, kết thúc lúc 16 giờ. Buổi học kéo dài bao lâu?", options: ["1 giờ", "1 giờ 30 phút", "2 giờ", "2 giờ 30 phút"], correctAnswerIndex: 1, difficulty: "Trung bình", subject: "Toán" },
  { text: "Trong câu 'Những tia nắng tinh nghịch nhảy múa trên tán lá', biện pháp nghệ thuật nào được sử dụng?", options: ["So sánh", "Nhân hóa", "Điệp từ", "Cường điệu"], correctAnswerIndex: 1, difficulty: "Trung bình", subject: "Tiếng Việt" },

  // --- MỨC ĐỘ KHÓ ---
  { text: "Vua Lý Thái Tổ dời đô về Thăng Long vào năm nào?", options: ["Năm 1000", "Năm 1010", "Năm 1020", "Năm 938"], correctAnswerIndex: 1, difficulty: "Khó", subject: "Lịch sử & Địa lý" },
  { text: "Giá trị của biểu thức 450 + 250 : 5 là:", options: ["140", "150", "500", "400"], correctAnswerIndex: 2, difficulty: "Khó", subject: "Toán" },
  { text: "Tiếng 'Mèo' do những bộ phận nào tạo thành?", options: ["Âm đầu M", "Âm đầu M, vần eo", "Âm đầu M, vần eo, thanh huyền", "Vần eo, thanh huyền"], correctAnswerIndex: 2, difficulty: "Khó", subject: "Tiếng Việt" },
  { text: "Bệnh nào dưới đây do muỗi truyền nhiễm?", options: ["Viêm gan B", "Sốt rét", "Cúm mùa", "Lao phổi"], correctAnswerIndex: 1, difficulty: "Khó", subject: "Tự nhiên & Xã hội" },
  { text: "Một khu đất hình chữ nhật có chu vi là 120m, chiều rộng là 20m. Tính chiều dài.", options: ["40m", "100m", "80m", "60m"], correctAnswerIndex: 0, difficulty: "Khó", subject: "Toán" },
  { text: "Bản Tuyên ngôn Độc lập do Bác Hồ đọc được viết tại địa chỉ nào?", options: ["Số 48 Phạm Ngũ Lão", "Số 48 Hàng Ngang", "Quảng trường Ba Đình", "Tân Trào"], correctAnswerIndex: 1, difficulty: "Khó", subject: "Lịch sử & Địa lý" },
  { text: "Trong câu ghép 'Trời mưa to, đường ngập nước', hai vế câu được nối với nhau bằng gì?", options: ["Dấu chấm", "Dấu phẩy", "Từ 'vì'", "Từ 'nên'"], correctAnswerIndex: 1, difficulty: "Khó", subject: "Tiếng Việt" },
  { text: "Quá trình biến đổi từ thể lỏng sang thể khí của nước gọi là gì?", options: ["Ngưng tụ", "Bay hơi", "Đông đặc", "Nóng chảy"], correctAnswerIndex: 1, difficulty: "Khó", subject: "Tự nhiên & Xã hội" },
  { text: "Có bao nhiêu hình tam giác trong hình thoi có 2 đường chéo?", options: ["4", "8", "6", "2"], correctAnswerIndex: 1, difficulty: "Khó", subject: "Toán" },
  { text: "Di tích lịch sử Hoàng thành Thăng Long nằm ở đâu?", options: ["Huế", "TP. Hồ Chí Minh", "Hà Nội", "Ninh Bình"], correctAnswerIndex: 2, difficulty: "Khó", subject: "Lịch sử & Địa lý" },
  ...Array.from({length: 40}).map((_, i) => {
    let a = Math.floor(Math.random() * 50) + 10;
    let b = Math.floor(Math.random() * 50) + 10;
    let c = Math.floor(Math.random() * 5) + 2;
    let ans = a * b * c;
    let ops = [ans, ans+c, ans-b, ans+a].sort();
    return {
      text: `Tính nhanh: ${a} × ${b} × ${c} = ?`,
      options: ops.map(String),
      correctAnswerIndex: ops.indexOf(ans),
      difficulty: "Khó" as Difficulty,
      subject: "Toán" as Subject
    };
  }),
  { text: "Số lớn nhất có 5 chữ số khác nhau bao gồm số 0 là:", options: ["98765", "98760", "99999", "98706"], correctAnswerIndex: 1, difficulty: "Khó", subject: "Toán" },
  { text: "Nhà văn sáng tác Dế Mèn phiêu lưu ký là ai?", options: ["Nam Cao", "Thạch Lam", "Tô Hoài", "Nguyễn Thi"], correctAnswerIndex: 2, difficulty: "Khó", subject: "Tiếng Việt" },
  { text: "Hỗn hợp nào sau đây không thể hòa tan vào nhau?", options: ["Nước và đường", "Nước và muối", "Nước và dầu ăn", "Nước và giấm"], correctAnswerIndex: 2, difficulty: "Khó", subject: "Tự nhiên & Xã hội" },
  { text: "Năm 2024 thuộc thế kỉ thứ mấy?", options: ["XIX", "XX", "XXI", "XXII"], correctAnswerIndex: 2, difficulty: "Khó", subject: "Toán" },
  { text: "Trận chiến Điện Biên Phủ trên không diễn ra trong bao nhiêu ngày đêm?", options: ["10 ngày đêm", "11 ngày đêm", "12 ngày đêm", "13 ngày đêm"], correctAnswerIndex: 2, difficulty: "Khó", subject: "Lịch sử & Địa lý" },
];

// Định dạng ID cho tất cả câu hỏi
export const QUESTIONS: Question[] = rawQuestions.map((q, index) => ({
  ...q,
  id: index + 1
}));
