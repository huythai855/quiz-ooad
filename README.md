# Quiz OOAD
Quiz trắc nghiệm **OOAD** - **Phân tích thiết kế hướng đối tượng** cho người người nhà nhà cùng ôn. <br />
Các câu hỏi được lấy từ bộ quiz OOAD của IBM, gồm 2 phần Analysis và Design. <br />
👉 Take the quiz now: [https://huythai855.github.io/quiz-ooad/](https://huythai855.github.io/quiz-ooad/)
<br />
<br />

## Tự tạo bài quiz của mình để ôn tập môn khác
Bạn có thể sử dụng template này để tự tạo bài quiz của để ôn tập các môn khác, với các bước khá đơn giản:
1. [Fork](https://github.com/huythai855/quiz-ooad/fork) dự án này về.
2. Thêm các dữ liệu câu hỏi của bạn vào file `questions.json`. Dữ liệu của bạn cần có dạng:
   ```json
    [
      {
          "question": "Question 1: Nội dung câu hỏi 1",
          "answers": [
              "A. Nội dung đáp án A",
              "B. Nội dung đáp án B",
              "C. Nội dung đáp án C",
              "D. Nội dung đáp án D"
          ],
          "correct_answers": [
              "C. Nội dung đáp án C"
          ],
          "image": "tên_file_ảnh_nếu_câu_đó_có_ảnh.png"
      },
      {
          "question": "Question 2: Nội dung câu hỏi 2",
          "answers": [
              "A. Nội dung đáp án A",
              "B. Nội dung đáp án B",
              "C. Nội dung đáp án C",
          ],
          "correct_answers": [
              "A. Nội dung đáp án A",
              "B. Nội dung đáp án B",
          ]
      },
   ]
   ```
   Tất nhiên, dữ liệu trên thực tế (đề cương thầy cô cho) không dưới dạng json và không hề dễ để convert thủ công sang dạng này. Khi đó, bạn có thể viết một prompt để ChatGPT làm hộ bạn công việc tay chân này, [tham khảo](https://chatgpt.com/share/09cab7e7-f564-4b8c-bf4a-f32d9fdbf3c1).
3. Deploy lên web: Bạn vào mục Settings của repo -> Pages -> Chọn `deploy from a branch` -> chọn đúng branch và save. Github Actions sẽ lo phần còn lại cho bạn.
4. Whohooo! You're done! Bạn sẽ thấy một thông báo `Your site is live at https://github-username-của-bạn.github.io/quiz-ooad/` thì có nghĩa bạn đã deploy thành công và có thể truy cập địa chỉ đó để làm quiz. Happy learning! 😇

<br />

## Demo
<div style="width: 100%;">
  <img src="https://i.imgur.com/nQJ1pvd.png" alt="GreenMart - Chợ nông sản sạch hàng đầu Việt Nam" style="width: 80%;">
</div>



_Built by @huythai855, @hongquant.17 and gpt-4o with luv!_ 💚
