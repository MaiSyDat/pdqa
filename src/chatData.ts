/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Message } from './types';

// Initial nostalgic message history replica
export const INITIAL_REPLICA_MESSAGES: Message[] = [
  // Mốc 1: 12/04/2026 14:44:46
  { id: 'rep-m1-date', sender: 'system_date', text: '14:44 12 THG 4, 2026' },
  { id: 'rep-m1-1', sender: 'dat', text: 'Ui 🤚🏻, Nay em có thấy tờ lý lịch của bạn *** *** đâu không' },
  { id: 'rep-m1-2', sender: 'quynh_anh', text: 'em không biết' },
  { id: 'rep-m1-3', sender: 'quynh_anh', text: 'anh hỏi bạn í ấy' },
  { id: 'rep-m1-4', sender: 'dat', text: 'Để anh xem' },

  // Mốc 2: 16/04/2026 19:20:36
  { id: 'rep-m2-date', sender: 'system_date', text: '19:20 16 THG 4, 2026' },
  { id: 'rep-m2-1', sender: 'quynh_anh', text: 'anh' },
  { id: 'rep-m2-2', sender: 'quynh_anh', text: 'giờ có nộp dc hồ sơ k ạ' },
  { id: 'rep-m2-3', sender: 'quynh_anh', text: 'em qua nộp dùm cô với' },
  { id: 'rep-m2-4', sender: 'dat', text: 'Được em qua đi' },

  // Mốc 3: 17/04/2026 12:47:47
  { id: 'rep-m3-date', sender: 'system_date', text: '12:47 17 THG 4, 2026' },
  { id: 'rep-m3-1', sender: 'quynh_anh', text: 'em gửi nhá' },
  { id: 'rep-m3-2', sender: 'quynh_anh', text: 'anh xem dc chưa' },
  { id: 'rep-m3-3', sender: 'dat', text: 'Của mã căn cước em nữa' },
  { id: 'rep-m3-4', sender: 'quynh_anh', text: '[Sticker]' },
  { id: 'rep-m3-5', sender: 'quynh_anh', text: 'a k nhớ à' },
  { id: 'rep-m3-6', sender: 'dat', text: 'Thế để lần sau về anh cố đọc đi đọc lại cho thuộc nhá' },
  { id: 'rep-m3-7', sender: 'quynh_anh', text: 'e gửi lần này th nhá' },
  { id: 'rep-m3-8', sender: 'quynh_anh', text: 'lần sau a nhớ đi' },
  { id: 'rep-m3-9', sender: 'dat', text: 'Nào em gánh được anh lên Cao thủ thì may ra nhớ được vài số đầu' }
];

// Modern sweet interactive messages following the historical ones
export const SWEET_CONVERSATION_SEQUENCE: Message[] = [
  { id: 'new-1', sender: 'quynh_anh', text: 'vậy gánh lên ctg là nhớ hết à' },
  { id: 'new-2', sender: 'dat', text: 'Lúc đấy thì cái gì cũng nhớ' },
  { id: 'new-3', sender: 'quynh_anh', text: '[Sticker]' },
  { id: 'new-4', sender: 'quynh_anh', text: 'nhớ cả em à' },
  { id: 'new-5', sender: 'quynh_anh', text: 'ngại lắm' },
  { id: 'new-6', sender: 'dat', text: 'Nhớ em, nhớ cả gia đình em luôn' },
  { id: 'new-7', sender: 'quynh_anh', text: 'vậy khi nào cho e cái hẹn nhé' },
  { id: 'new-8', sender: 'quynh_anh', text: 'để dc a nhớ' },
  { id: 'new-9', sender: 'dat', text: 'Tối nào anh cũng rảnh cả, chỉ cần em rủ thôi' },
  { id: 'new-blank-1', sender: 'quynh_anh_blank', text: '110px' },
  { id: 'new-blank-2', sender: 'dat_blank', text: '80px' },
  { id: 'new-blank-3', sender: 'quynh_anh_blank', text: '145px' },
  { id: 'new-blank-4', sender: 'dat_blank', text: '70px' },
  { id: 'rep-m2-date', sender: 'system_date', text: '19:20 18 THG 4, 2026' },
  { id: 'new-10', sender: 'dat', text: 'Em giỏi thế chưa nhìn thấy anh bao giờ mà đoán đúng hết 5 bức hình luôn' },
  { id: 'new-11', sender: 'quynh_anh', text: 'Em đẳng cấp mà' },
  { id: 'new-12', sender: 'dat', text: 'Vậy em làm người yêu anh nháaaa ' },
  { id: 'new-13', sender: 'quynh_anh', text: 'Mơ điii' },
];

// Contentious / Argument conversational sequence representing the split
export const ARGUMENT_CONVERSATION_SEQUENCE: Message[] = [
  { id: 'arg-date-1', sender: 'system_date', text: '20:05 02 THG 6, 2026' },

  { id: 'arg-1', sender: 'dat', text: 'Anh thật sự không thích em đăng những tấm ảnh hở hang đó lên mạng đâu. Anh biết đó là sở thích của em nhưng anh khó chịu lắm.' },

  { id: 'arg-2', sender: 'quynh_anh', text: 'Đấy là con người em từ trước đến giờ. Em chưa từng làm gì có lỗi với anh cả, tại sao anh cứ muốn em thay đổi?' },

  { id: 'arg-3', sender: 'dat', text: 'Anh chỉ sợ mất em thôi. Anh không thích cảm giác ai cũng có thể nhìn em như vậy.' },

  { id: 'arg-4', sender: 'quynh_anh', text: 'Nhưng anh có biết càng ngày em càng thấy ngột ngạt không? Đi chơi với bạn anh khó chịu, đăng ảnh anh khó chịu, trả lời tin nhắn chậm anh cũng suy diễn.' },

  { id: 'arg-5', sender: 'dat', text: 'Vậy cuối cùng tất cả đều là lỗi của anh à?' },

  { id: 'arg-6', sender: 'quynh_anh', text: 'Lần nào anh cũng nói như vậy. Em chỉ đang nói cảm nhận của em thôi nhưng anh luôn nghĩ em đang trách anh.' },

  { id: 'arg-7', sender: 'dat', text: 'Anh đã cố thay đổi rất nhiều rồi.' },

  { id: 'arg-8', sender: 'quynh_anh', text: 'Em biết. Nhưng chính điều đó mới làm em áp lực. Em không muốn ai phải thay đổi quá nhiều vì em cả.' },

  { id: 'arg-9', sender: 'dat', text: 'Anh xin lỗi' },

  { id: 'arg-seen', sender: 'system_date', text: 'Đã xem' },

  { id: 'arg-date-2', sender: 'system_date', text: '2 ngày sau' },

  { id: 'arg-13', sender: 'quynh_anh', text: 'e bảo này' },

  { id: 'arg-14', sender: 'quynh_anh', text: 'bây giờ em k có tâm trạng yêu đương gì hết, mình nói chuyện tí đi' },

  { id: 'arg-15', sender: 'quynh_anh', text: 'Anh đừng đợi em nữa nhé.' },

  { id: 'arg-16', sender: 'quynh_anh', text: 'Tụi mình sẽ không quay lại đâu anh.' },

  { id: 'arg-17', sender: 'quynh_anh', text: 'Cảm ơn anh vì đã từng yêu em nhiều như thế.' },

  { id: 'arg-18', sender: 'dat', text: '...' },

  { id: 'arg-attachment', sender: 'attachment', text: '✉️ Bức thư tay viết gửi tặng riêng Quỳnh Anh tình yêu của anh' }
];
