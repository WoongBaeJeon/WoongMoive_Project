import { DTO_TYPE } from "./config";

// User data 매핑용 함수
export const changeFromDto = ({ type, dto }) => {
  switch (type) {
    case DTO_TYPE.user: {
      const { user_metadata: userInfo } = dto?.user ?? {};

      const displayName = //이름 필드 선언.
        userInfo.display_name || // 이메일 회원가입 시 직접 저장한 값
        userInfo.full_name || // Google
        userInfo.name || // 다른 OAuth
        userInfo.nickname || // Kakao
        userInfo.userName || // 예전에 저장한 값
        (userInfo.email ? userInfo.email.split("@")[0] : "Unknown");

      return {
        user: {
          id: userInfo.sub,
          email: userInfo.email,
          userName: userInfo.userName
            ? userInfo.userName
            : userInfo.email.split("@")[0],
          profileImageUrl: userInfo.avatar_url,
          name: displayName, //displayName 이름 필드 추가. //userName은 닉네임
        },
      };
    }

    case DTO_TYPE.error: {
      if (!dto.error) {
        return {
          error: {
            status: 500,
            message:
              "DTO_TYPE ERROR를 확인해주세요. 데이터 내부 error 객체가 없습니다.",
          },
        };
      }

      const rawError = dto.error;

      return {
        error: {
          status: rawError.status,
          message: rawError.message,
        },
      };
    }
    default: {
      new Error("wrong type accessed");
      return;
    }
  }
};
