- [Cloudflare Workers 배포 환경 가이드](https://github.com/SWYP12-UNIBUSK/unibusk-frontend/blob/main/docs/cloudflare-guide.md)

# mise 프로젝트 초기 설정 가이드

## 1️⃣ mise 활성화 (최초 1회만)

**zsh (macOS 기본, 대부분의 Linux)**

```bash
echo 'eval "$(mise activate zsh)"' >> ~/.zshrc
source ~/.zshrc
```

**bash (일부 Linux, Git Bash)**

```bash
echo 'eval "$(mise activate bash)"' >> ~/.bashrc
source ~/.bashrc
```

> 💡 현재 쉘 확인: `echo $SHELL`

## 2️⃣ 프로젝트 신뢰하기

<img width="755" height="98" alt="Image" src="https://github.com/user-attachments/assets/f70939bf-3c20-4747-b7c5-ac50b976c9e7" />

프로젝트 진입 시 **`mise.toml are not trusted.`** 에러가 나타나면:

```bash
cd your-project
mise trust
```

## 3️⃣ 도구 설치

**macOS**

```bash
brew install mise
```

**Windows (Scoop 권장)**

```powershell
# Scoop이 없다면 먼저 설치
irm get.scoop.sh | iex

# mise 설치
scoop install mise
```

**Windows (winget 대안)**

```powershell
winget install jdx.mise
```

## 4️⃣ 문제 해결

설정이 제대로 되었는지 확인:

```bash
mise doctor
```

<img width="401" height="21" alt="Image" src="https://github.com/user-attachments/assets/a4db4ec8-9c54-4534-83e5-efae0bc2cd19" />

✅ 위의 이미지가 보여야 정상입니다.

---

## 📚 자세한 내용

- [**mise 공식 문서**](https://mise.jdx.dev/)
- [**mise trust 명령어**](https://mise.jdx.dev/cli/trust.html)
- [**문제 해결 가이드**](https://mise.jdx.dev/troubleshooting.html)
