import numpy as np
import xml.etree.ElementTree as ET
from datetime import datetime, timedelta
import random

def generate_typing_records_updated(start_date, end_date, days_per_week_range, sessions_per_day_range,
                                    mean_speed, std_dev_speed, precision_range):
    def random_datetime(date, time_ranges):
        time_range = random.choice(time_ranges)
        start_time_str, end_time_str = time_range.split('-')
        start_time = datetime.strptime(start_time_str, '%H:%M')
        if '02:00' in end_time_str:
            end_time = datetime.strptime(end_time_str, '%H:%M') + timedelta(days=1)
        else:
            end_time = datetime.strptime(end_time_str, '%H:%M')
        random_time = start_time + timedelta(seconds=random.randint(0, int((end_time - start_time).total_seconds())))
        return datetime.combine(date, random_time.time())

    def insert_abnormal_values(records, num_abnormal_values, speed_range, precision_range):
        for _ in range(num_abnormal_values):
            session_date = random.choice(records)['date']
            session_time = random.choice(records)['time']
            speed = random.randint(*speed_range)
            precision = random.randint(0, 10)  # 模拟精度在10%以下
            records.append({
                'id': random.randint(1, 9),  # 文章ID在1-9范围内
                'date': session_date,
                'time': session_time,
                'speed': speed,
                'precision': precision
            })

    time_ranges = ['12:00-13:40', '18:00-02:00']
    start_date = datetime.strptime(start_date, '%Y-%m-%d')
    end_date = datetime.strptime(end_date, '%Y-%m-%d')
    current_date = start_date
    records = []

    while current_date <= end_date:
        num_days_remaining = (end_date - current_date).days + 1
        for _ in range(random.randint(days_per_week_range[0], days_per_week_range[1])):
            num_sessions = random.randint(sessions_per_day_range[0], sessions_per_day_range[1])
            num_sessions = min(num_sessions, num_days_remaining)  # 确保不超过可用天数
            for _ in range(num_sessions):
                session_time = random_datetime(current_date, time_ranges)
                speed = max(0, int(np.random.normal(mean_speed, std_dev_speed)))
                precision = random.randint(*precision_range)
                records.append({
                    'id': random.randint(1, 9),  # 模式ID在1-9范围内
                    'date': session_time.strftime('%Y-%m-%d'),
                    'time': session_time.strftime('%H:%M:%S'),
                    'speed': speed,
                    'precision': precision
                })

        current_date += timedelta(days=7)  # 移动到下一周

    # 随机删除一些记录以模拟缺失数据
    num_records_to_delete = random.randint(1, len(records) // 3)
    records_to_delete = random.sample(records, num_records_to_delete)
    records = [record for record in records if record not in records_to_delete]

    # 插入异常值并重新排序记录
    insert_abnormal_values(records, random.randint(3, 5), (800, 999), precision_range)
    records = sorted(records, key=lambda x: (x['date'], x['time']))

    return records

# 用法
start_date = '2023-10-3'
end_date = '2023-11-28'
days_per_week_range = (2, 5)  # 每周2到5天
sessions_per_day_range = (1, 3)  # 每天1到3个会话
mean_speed = 110  # 正态分布的平均速度
std_dev_speed = 10  # 正态分布的标准差
precision_range = (98, 100)  # 精度范围

records_updated = generate_typing_records_updated(
    start_date, end_date, days_per_week_range, sessions_per_day_range,
    mean_speed, std_dev_speed, precision_range
)

# 创建带有更新记录ID的XML结构
root_updated = ET.Element("records", id=str(len(records_updated)))
for record in records_updated:
    ET.SubElement(root_updated, "item", speed=str(record['speed']), precision=str(record['precision']),
                  id=str(record['id']), time=record['time'], date=record['date'])

# 转换为XML字符串
xml_data_updated = ET.tostring(root_updated, encoding='unicode', method='xml')

# 将XML数据写入文件
with open('score.xml', 'w') as file:
    file.write(xml_data_updated)

# 创建用于分数的XML结构
root_scores = ET.Element("grade", lastdate=end_date)
for record in records_updated:
    ET.SubElement(root_scores, "score", type="notype", s=str(record['speed']))

# 转换为XML字符串
xml_data_scores = ET.tostring(root_scores, encoding='unicode', method='xml')

# 将XML数据写入文件
with open('records.xml', 'w') as file:
    file.write(xml_data_scores)

xml_data_scores[:500]  # 显示XML数据的前部分以确认
