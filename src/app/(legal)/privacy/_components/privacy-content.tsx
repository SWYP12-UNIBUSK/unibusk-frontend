export function PrivacyContent() {
  return (
    <div className="flex flex-col gap-8 text-gray-700">
      <section className="flex flex-col gap-2">
        <h2 className="typo-body-sb-3 text-black">제 1조 ( 목적 )</h2>
        <p className="typo-caption-r-2 leading-relaxed">
          고스락(이하 "회사"라고 함)는 회사가 제공하고자 하는 서비스 (이하 "회사 서비스")를 이용하는 개인
          ( 이하 "이용자" 또는 "개인")의 정보( 이하 "개인정보")를 보호하기 위해, 개인정보보호법,
          정보통신망 이용촉진 및 정보보호 등에 관한 법률(이하 '정보통신망법') 등 관련 법령을 준수하고,
          서비스 이용자의 개인정보 보호 관련한 고충을 신속하고 원할하게 처리할 수 있도록 하기 위하여
          다음과 같이 개인정보처리 방침 ( 이하 "본 방침")을 수립합니다.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="typo-body-sb-3 text-black">제 2조 ( 개인정보 처리의 원칙 )</h2>
        <p className="typo-caption-r-2 leading-relaxed">
          개인정보 관련 법령 및 본 방침에 따라 회사는 이용자의 개인정보를 수집할 수 있으며
          수집된 개인정보는 개인의 동의가 있는 경우에 한해 제 3자에게 제공될 수 있습니다.
          단, 법령의 규정 등에 의해 적법하게 강제되는 경우 회사는 수집한 이용자의 개인정보를
          사전에 개인의 동의 없이 제 3자에게 제공할 수도 있습니다.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="typo-body-sb-3 text-black">제 3조 ( 본 방침의 변경 )</h2>
        <ol className="flex list-decimal flex-col gap-2 pl-5 typo-caption-r-2">
          <li>본 방침은 개인정보 관련 법령, 지침, 고시 또는 정부나 회사 서비스의 정책이나 내용의 변경에 따라 개정될 수 있습니다.</li>
          <li>
            회사는 제 1항에 따라 본 방침을 개정하는 경우 다음 각 호 하나 이상의 방법으로 공지합니다.
            <ol className="mt-1 flex list-[lower-alpha] flex-col gap-1 pl-5">
              <li>회사가 운영하는 인터넷 홈페이지의 첫 화면의 공지사항란 또는 별도의 창을 통하여 공지하는 방법</li>
              <li>서면, 모사전송, 전자우편 또는 이와 비슷한 방법으로 이용자에게 공지하는 방법</li>
            </ol>
          </li>
          <li>회사는 제 2항의 공지는 본 방침 개정의 시행일로부터 최소 7일 이전에 공지합니다. 다만, 이용자 권리의 중요한 변경이 있을 경우에는 최소 30일 전에 공지합니다.</li>
        </ol>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="typo-body-sb-3 text-black">제 4조 ( 회원 가입을 위한 정보 )</h2>
        <p className="typo-caption-r-2 leading-relaxed">
          회사는 이용자의 회사 서비스에 대한 회원가입을 위하여 다음과 같은 정보를 수집합니다.
        </p>
        <ol className="flex list-decimal flex-col gap-2 pl-5 typo-caption-r-2">
          <li>
            필수 수집 정보
            <ol className="mt-1 flex list-[lower-alpha] flex-col gap-1 pl-5">
              <li>카카오톡 회원가입의 경우 : 이메일 주소, 이름, 닉네임, 생년월일 및 휴대폰 연락처, 프로필 사진</li>
            </ol>
          </li>
        </ol>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="typo-body-sb-3 text-black">제 5조 ( 결제 서비스를 위한 정보 )</h2>
        <p className="typo-caption-r-2 leading-relaxed">
          회사는 이용자에게 회사의 결제 서비스 제공을 위하여 다음과 같은 정보를 수집합니다.
        </p>
        <ol className="flex list-decimal flex-col gap-1 pl-5 typo-caption-r-2">
          <li>필수 수집 정보 : 카드번호, 유효기간, 생년월일 6자리 및 은행명</li>
        </ol>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="typo-body-sb-3 text-black">제 6조 ( 현금 영수증 발행을 위한 정보 )</h2>
        <p className="typo-caption-r-2 leading-relaxed">
          회사는 이용자의 현금 영수증을 발행하기 위하여 다음과 같은 정보를 수집합니다.
        </p>
        <ol className="flex list-decimal flex-col gap-1 pl-5 typo-caption-r-2">
          <li>필수 수집 정보 : 현금영수증 발행 대상자 이름, 현금영수증 발행 대상자 생년월일, 현금영수증 발행 대상자 주소, 휴대폰 번호 및 현금영수증 카드번호</li>
        </ol>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="typo-body-sb-3 text-black">제 7조 ( 회사 서비스 제공을 위한 정보 )</h2>
        <p className="typo-caption-r-2 leading-relaxed">
          회사는 이용자에게 회사의 서비스를 제공하기 위해서 다음과 같은 정보를 수집합니다.
        </p>
        <ol className="flex list-decimal flex-col gap-2 pl-5 typo-caption-r-2">
          <li>
            필수 수집 정보
            <ol className="mt-1 flex list-[lower-alpha] flex-col gap-1 pl-5">
              <li>카카오톡 회원가입한 개인의 경우 : 이메일 주소, 이름, 닉네임, 생년월일 및 휴대폰 연락처, 프로필 사진</li>
            </ol>
          </li>
        </ol>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="typo-body-sb-3 text-black">제 8조 ( 서비스 이용 및 부정 이용 확인을 위한 정보 )</h2>
        <p className="typo-caption-r-2 leading-relaxed">
          회사는 이용자의 서비스 이용 및 부정이용의 확인 및 분석을 위하여 다음과 같은 정보를 수집합니다.
        </p>
        <ol className="flex list-decimal flex-col gap-1 pl-5 typo-caption-r-2">
          <li>필수 수집 정보 : 서비스 이용기록, 쿠키, 접속지 정보 및 기기정보</li>
        </ol>
        <p className="typo-caption-r-2 leading-relaxed text-gray-600">
          * 부정이용 : 회원탈퇴 후 재가입, 상품구매 후 구매취소 등을 반복적으로 행하는 등 회사가 제공하는
          할인쿠폰, 이벤트 혜택 등의 경제상 이익을 불법적, 편법적으로 수취하는 행위, 이용약관 등에서
          금지하고 있는 행위, 명의도용 등의 불법, 편법행위 등을 말합니다. 수집되는 정보는 회사 서비스
          이용에 따른 통계, 분석에 이용될 수 있습니다.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="typo-body-sb-3 text-black">제 9조 ( 개인정보 수집 방법 )</h2>
        <p className="typo-caption-r-2 leading-relaxed">
          회사는 다음과 같은 방법으로 이용자의 개인정보를 수집합니다.
        </p>
        <ol className="flex list-decimal flex-col gap-1 pl-5 typo-caption-r-2">
          <li>이용자가 회사의 홈페이지에 자신의 개인정보를 입력하는 방식</li>
          <li>어플리케이션 등 회사가 제공하는 홈페이지 외의 서비스를 통해 이용자가 자신의 개인정보를 입력하는 방식</li>
          <li>이용자가 고객센터(고스락 카카오톡 채널 등) 상담, 게시판에서의 활동 등 회사의 서비스를 이용하는 과정에서 이용자가 입력하는 방식</li>
        </ol>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="typo-body-sb-3 text-black">제 10조 ( 개인정보의 이용 )</h2>
        <p className="typo-caption-r-2 leading-relaxed">
          회사는 개인정보를 다음 각 호의 경우에 이용합니다.
        </p>
        <ol className="flex list-decimal flex-col gap-1 pl-5 typo-caption-r-2">
          <li>공지사항 전달 등 회사의 운영에 필요한 경우</li>
          <li>이용문의에 대한 회신, 불만의 처리 등 이용자에 대한 서비스 개선을 위한 경우</li>
          <li>회사의 서비스를 제공하기 위한 경우</li>
          <li>신규 서비스 개발을 위한 경우</li>
          <li>이벤트 및 행사 안내 등 마케팅을 위한 경우</li>
          <li>인구 통계학적 분석, 서비스 방문 및 이용기록의 분석을 위한 경우</li>
          <li>개인정보 및 관심에 기반한 이용자간 관계의 형성을 위한 경우</li>
          <li>법령 및 회사 약관을 위반하는 회원에 대한 이용 제한 조치, 부정 이용 행위를 포함하여 서비스의 원활한 운영에 지장을 주는 행위에 대한 방지 및 제재를 위한 경우</li>
        </ol>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="typo-body-sb-3 text-black">제 11조 ( 개인정보 처리 위탁 )</h2>
        <p className="typo-caption-r-2 leading-relaxed">
          회사는 원활한 서비스 제공과 효과적인 업무를 처리하기 위하여 다음 각 호와 같이 개인정보를 처리 위탁하고 있습니다.
        </p>
        <ol className="flex list-decimal flex-col gap-1 pl-5 typo-caption-r-2">
          <li>토스페이먼츠(주) 에게 결제대행(PG), 현금 영수증 발행을 위하여 5년동안 개인정보 처리를 위탁함</li>
          <li>Amazon Web Services Inc. 에게 서비스 이용 기록, 수집된 개인정보를 서비스 운영을 위하여 현재 회사가 이용중인 클라우드 서비스 이용 변경시까지(국내 서울 리전) 개인정보처리를 위탁함</li>
          <li>네이버 클라우드. 카카오톡 알림톡, 문자발송 등을 위해 개인정보 처리를 위탁함</li>
        </ol>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="typo-body-sb-3 text-black">제 12조 ( 개인정보의 보유 및 이용기간 )</h2>
        <ol className="flex list-decimal flex-col gap-1 pl-5 typo-caption-r-2">
          <li>회사는 이용자의 개인정보에 대해 개인정보의 수집, 이용 목적 달성을 위한 기간 동안 개인정보를 보유 및 이용합니다.</li>
          <li>전항에도 불구하고 회사는 내부 방침에 의해 서비스 부정이용기록은 부정 가입 및 이용 방지를 위하여 회원 탈퇴 시점으로부터 최대 1년간 보관합니다.</li>
        </ol>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="typo-body-sb-3 text-black">제 13조 ( 법령에 따른 개인정보의 보유 및 이용기간 )</h2>
        <p className="typo-caption-r-2 leading-relaxed">
          회사는 관계법령에 따라 다음과 같이 개인정보를 보유 및 이용합니다.
        </p>
        <ol className="flex list-decimal flex-col gap-3 pl-5 typo-caption-r-2">
          <li>
            전자상거래 등에서의 소비자보호에 관한 법률에 따른 보유 정보 및 보유기간
            <ol className="mt-1 flex list-[lower-alpha] flex-col gap-1 pl-5">
              <li>계약 또는 청약철회 등에 관한 기록 : 5년</li>
              <li>대금 결제 및 재화의 공급에 관한 기록 : 5년</li>
              <li>소비자의 불만 또는 분쟁처리에 관한 기록 : 3년</li>
              <li>표시, 광고에 관한 기록 : 6개월</li>
            </ol>
          </li>
          <li>
            통신비밀 보호법에 따른 보유 정보 및 보유기간
            <ol className="mt-1 flex list-[lower-alpha] flex-col gap-1 pl-5">
              <li>웹사이트 로그 기록 자료 : 3개월</li>
            </ol>
          </li>
          <li>
            전자금융 거래법에 따른 보유정보 및 보유 기간
            <ol className="mt-1 flex list-[lower-alpha] flex-col gap-1 pl-5">
              <li>전자금융거래에 관한 기록 : 5년</li>
            </ol>
          </li>
          <li>
            위치정보의 보호 및 이용 등에 관한 법률
            <ol className="mt-1 flex list-[lower-alpha] flex-col gap-1 pl-5">
              <li>개인 위치 정보에 관한 기록 : 6개월</li>
            </ol>
          </li>
        </ol>
      </section>
    </div>
  );
}
