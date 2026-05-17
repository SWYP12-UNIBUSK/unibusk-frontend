export function TermsContent() {
  return (
    <div className="flex flex-col text-gray-700">
      <section className="flex flex-col">
        <h2 className="typo-body-sb-3 text-black">제 1조 목적</h2>
        <p className="typo-caption-r-2 leading-relaxed">
          본 약관은 두둥스튜디오 (이하 "회사")에서 제공하는 모든 제품 및 서비스(이하 "본 서비스")의
          이용에 관하여 회사와 본 서비스의 회원 또는 비회원과의 관계를 설명하는 것에 목적이 있습니다.
          본 서비스를 이용하거나 회원가입을 통해 본 서비스의 회원이 될 경우 본 약관 및 관련 운영 정책을
          동의하신 것으로 봅니다.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="typo-body-sb-3 text-black">제 2조 용어 정의</h2>
        <ol className="flex list-decimal flex-col gap-1 pl-5 typo-caption-r-2">
          <li>공연 - 행사, 공연 등 모임에 참가자를 모집하기 위한 목적으로 두둥 서비스에 생성하는 콘텐츠를 말합니다.</li>
          <li>주최자(호스트) - 두둥 서비스에서 공연를 생성하여 다른 여러 회원의 참가 신청을 받는 회원을 말합니다.</li>
          <li>참가자 - 두둥 서비스의 공연에 티켓 결제 등의 방법으로 참가 신청을 하는 회원을 말합니다.</li>
          <li>사용자 생성 콘텐츠 - 회원이 직접 본 서비스에서 생성한 게시글, 댓글, 공연 등의 콘텐츠를 말합니다.</li>
        </ol>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="typo-body-sb-3 text-black">제 3조 약관 동의</h2>
        <ol className="flex list-decimal flex-col gap-1 pl-5 typo-caption-r-2">
          <li>회원은 본 약관의 규정에 따라 본 서비스를 이용해야 합니다.</li>
          <li>회원이 미성년자일 경우에는 친권자 등 법정대리인의 동의를 얻은 후 본 서비스를 이용해야합니다.</li>
          <li>회원이 본 서비스를 사업자를 위해 이용할 경우에는 해당 사업자 역시 본 약관에 동의한 후 서비스를 이용해야 합니다.</li>
          <li>회사는 개별 서비스에 대해서는 별도의 이용약관 및 정책(개별약관)을 둘 수 있으며, 해당 내용이 이 약관과 상충할 경우에는 개별약관을 우선하여 적용합니다.</li>
        </ol>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="typo-body-sb-3 text-black">제 4조 약관 변경</h2>
        <ol className="flex list-decimal flex-col gap-1 pl-5 typo-caption-r-2">
          <li>
            회사에서 필요하다고 판단할 경우, 회원에 대한 사전 통지 없이 언제라도 본 약관 및 개별 이용약관을
            변경할 수 있습니다. 변경 후의 본 약관 및 개별 이용약관은 회사가 운영하는 웹사이트 내의 적절한
            장소에 게시된 시점부터 그 효력이 발생하며, 본 약관 및 개별 이용약관이 변경된 후에도 회원이
            본 서비스를 계속 이용함으로써 변경 후의 본 약관 및 적용된 개별 이용약관에 대해 유효하고 취소
            불가능한 동의를 한 것으로 간주됩니다.
          </li>
          <li>
            회원이 변경된 약관에 관하여 동의하지 못할 경우 회사는 회원에게 변경된 약관을 강제로 적용하지
            않습니다. 다만 회원은 변경된 약관에 대한 동의없이 본 서비스를 이용할 수 없다는 것을 인지해야
            합니다. 회원은 언제든지 회원탈퇴 신청을 통해 자유롭게 서비스 이용계약 해지가 가능합니다.
          </li>
        </ol>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="typo-body-sb-3 text-black">제 5조 이용 계약 성립</h2>
        <ol className="flex list-decimal flex-col gap-1 pl-5 typo-caption-r-2">
          <li>사용자가 두둥 서비스의 회원가입 기능을 이용하여 필요한 정보를 제출할 시 이용 약관이 체결됩니다.</li>
        </ol>
        <p className="typo-caption-r-2 leading-relaxed">
          회사는 다음 각 호에 해당하는 회원에 관하여 언제든 이용계약을 해지할 수 있습니다. 각 호에 해당하는
          경우는 보통 약관 위배, 관계 법령 위배, 사회질서 저해에 해당합니다.
        </p>
        <ol className="flex list-decimal flex-col gap-1 pl-5 typo-caption-r-2">
          <li>만 14세 미만인 경우</li>
          <li>타인의 명의를 이용한 경우</li>
          <li>등록 내용에 허위 정보를 기재하거나 필수 정보가 누락되었을 경우</li>
          <li>부정한 용도를 목적으로 본 서비스를 이용하는 경우</li>
          <li>본 서비스가 제공하는 방법 외의 방법으로 영리를 취하려고 하는 경우</li>
          <li>관계법령에 위배되는 경우</li>
          <li>사회의 질서 혹은 미풍양속을 저해할 수 있는 사용자 생성 콘텐츠를 업로드하는 경우</li>
          <li>타인의 권리나 명예를 침해하는 경우</li>
          <li>본 약관 위배로 회사에 의하여 이용계약이 해지된 경우 (회사에서 재가입 승낙한 경우 제외)</li>
        </ol>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="typo-body-sb-3 text-black">제 6조 이용 계약 종료</h2>
        <ol className="flex list-decimal flex-col gap-1 pl-5 typo-caption-r-2">
          <li>회원은 언제든지 회사에게 해지의사를 통지함으로써 이용계약을 해지할 수 있습니다.</li>
          <li>이용계약은 회원의 해지의사가 회사에 도달한 때에 종료됩니다.</li>
          <li>회원탈퇴 시 해당 계정의 개인정보는 파기됩니다. 다만 결제기록 등 보관이 필요한 정보는 유지될 수 있습니다. 자세한 내용은 회사의 개인정보처리방침을 참고 바랍니다.</li>
        </ol>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="typo-body-sb-3 text-black">제 7조 회원의 의무와 책임</h2>
        <ol className="flex list-decimal flex-col gap-1 pl-5 typo-caption-r-2">
          <li>회원은 회원 자신의 책임 하에 본 서비스를 이용해야 하며, 본 서비스에서 행한 모든 행위 및 그 결과에 대해서 모든 책임을 져야 합니다.</li>
          <li>회사는 회원이 본 약관에 위반하는 형태로 본 서비스를 이용하고 있다고 판단되는 경우, 회사에 적절하다고 판단하는 조치를 취합니다. 다만 회사는 이러한 위반 행위를 방지 또는 시정할 의무를 갖지 않습니다.</li>
          <li>회원의 본 서비스 이용에 있어서, 또는 이러한 이용으로 제 3자로부터 클레임을 받아 회사가 직접적 혹은 간접적으로 어떤 손해를 입었을 경우, 회원은 회사의 요구에 따라 즉시 이를 보상해야 합니다.</li>
        </ol>
      </section>
    </div>
  );
}
