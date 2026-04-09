import os
import discord
from discord.ext import commands

from myserver import server_on
intents = discord.Intents.default()
intents.message_content = True
intents.members = True

bot = commands.Bot(command_prefix="!", intents=intents)

TARGET_CHANNEL_ID = 1491815351975940367
ROLE_ID = 1484627936144523396

# คำถามและคำตอบ
quiz = {
    "question": "ประเทศไทยมีเมืองหลวงชื่ออะไร?",
    "answer": "โค"
}

# Modal สำหรับพิมพ์คำตอบ
class AnswerModal(discord.ui.Modal, title="ตอบคำถาม"):
    answer = discord.ui.TextInput(label="พิมพ์คำตอบของคุณที่นี่:")

    def __init__(self, user: discord.Member):
        super().__init__()
        self.user = user

    async def on_submit(self, interaction: discord.Interaction):
        if interaction.user != self.user:
            await interaction.response.send_message("ไม่ใช่คุณ!", ephemeral=True)
            return

        if self.answer.value.strip() == quiz["answer"]:
            await interaction.response.send_message("ยส ✅", ephemeral=True)
            # ใส่ Role
            role = interaction.guild.get_role(ROLE_ID)
            if role and role not in self.user.roles:
                await self.user.add_roles(role)
        else:
            await interaction.response.send_message("ผิด ❌", ephemeral=True)

# View สำหรับปุ่ม
class QuizView(discord.ui.View):
    @discord.ui.button(label="ตอบคำถาม", style=discord.ButtonStyle.primary)
    async def answer_button(self, interaction: discord.Interaction, button: discord.ui.Button):
        modal = AnswerModal(interaction.user)
        await interaction.response.send_modal(modal)

@bot.event
async def on_ready():
    print(f"Bot พร้อมใช้งาน: {bot.user}")
    channel = bot.get_channel(TARGET_CHANNEL_ID)
    if channel:
        view = QuizView()
        await channel.send(f"คำถาม: {quiz['question']}", view=view)

server_on()

bot.run(os.getenv('Token'))