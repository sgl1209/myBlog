# 服务器连接指南

## 服务器信息
- **IP 地址**: 8.138.208.57
- **用户名**: admin
- **端口**: 22 (默认 SSH 端口)

## 连接方法

### 方法一：使用 PowerShell（Windows）

1. **打开 PowerShell**（以管理员身份运行）

2. **执行连接命令**：
```powershell
ssh admin@8.138.208.57
```

3. **首次连接**：
   - 会提示：`The authenticity of host '8.138.208.57' can't be established...`
   - 输入 `yes` 确认

4. **输入密码**：
   - 输入服务器密码（输入时不会显示，这是正常的）
   - 按 Enter 确认

5. **连接成功**：
   - 看到服务器提示符（如 `admin@server:~$`）表示连接成功

### 方法二：使用 PuTTY（Windows 图形界面）

1. **下载 PuTTY**：
   - 访问：https://www.putty.org/
   - 下载并安装

2. **配置连接**：
   - Host Name: `8.138.208.57`
   - Port: `22`
   - Connection type: `SSH`
   - Saved Sessions: 输入 `myBlog-server`，点击 Save

3. **连接**：
   - 点击 "Open"
   - 输入用户名：`admin`
   - 输入密码

### 方法三：使用 VS Code Remote SSH

1. **安装扩展**：
   - 在 VS Code 中搜索并安装 "Remote - SSH"

2. **连接**：
   - 按 `F1` 或 `Ctrl+Shift+P`
   - 输入 "Remote-SSH: Connect to Host"
   - 选择 "Add New SSH Host"
   - 输入：`admin@8.138.208.57`
   - 选择配置文件保存位置
   - 点击连接

3. **输入密码**：
   - 在弹出的终端中输入密码

## 连接后验证

连接成功后，运行以下命令验证：

```bash
# 查看系统信息
uname -a

# 查看当前用户
whoami

# 查看当前目录
pwd

# 查看磁盘空间
df -h
```

## 常见问题

### 1. 连接超时

**可能原因**：
- 防火墙未开放 22 端口
- 服务器未启动 SSH 服务
- IP 地址错误

**解决方法**：
- 检查服务器防火墙设置
- 确认服务器 IP 地址正确
- 联系服务器提供商检查网络配置

### 2. 权限被拒绝

**可能原因**：
- 用户名错误
- 密码错误
- SSH 服务配置问题

**解决方法**：
- 确认用户名和密码正确
- 检查服务器 SSH 配置：`sudo nano /etc/ssh/sshd_config`

### 3. 首次连接提示

首次连接会显示：
```
The authenticity of host '8.138.208.57' can't be established.
ECDSA key fingerprint is SHA256:...
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```

输入 `yes` 即可，这是正常的安全验证。

## 下一步：部署项目

连接成功后，按照 `DEPLOYMENT.md` 中的步骤部署博客项目。

## 快速连接命令

```powershell
# PowerShell 中直接运行
ssh admin@8.138.208.57
```

## 使用密钥认证（可选，更安全）

如果服务器支持密钥认证，可以配置 SSH 密钥：

1. **生成密钥对**（在本地）：
```powershell
ssh-keygen -t rsa -b 4096
```

2. **复制公钥到服务器**：
```powershell
type $env:USERPROFILE\.ssh\id_rsa.pub | ssh admin@8.138.208.57 "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

3. **之后连接无需密码**：
```powershell
ssh admin@8.138.208.57
```
