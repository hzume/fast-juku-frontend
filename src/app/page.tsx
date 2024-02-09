"use client"

import { useUser } from '@/providers/UserContext';
import { useSession } from 'next-auth/react'

export default function Home() {
  const user = useUser();
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex justify-between">
        <h2>ようこそ、{user?.family_name}さん</h2>
      </div>
      <div className="h-1/3 card bg-base-200 rounded-box">
        <ul className='m-8 ml-16 space-y-4 text-xl'>
          <li>● 講師情報の登録・削除・更新は「管理メニュー」</li>
          <li>● 給与計算は「給与計算→時間割登録」</li>
          <li>● 過去の給与明細は「給与計算→閲覧」</li>
        </ul>
      </div>
      <div className="divider"></div>
      <div className="h-1/3 card bg-base-200 rounded-box">
        <ul className='m-8 ml-16 space-y-4 text-xl'>
          <li>1/12: 講師登録機能を追加</li>
          <li>1/12: 個人の詳細な給与明細を追加</li>
          <li>1/12: 登録済みの給与情報の削除機能を追加</li>
        </ul>
      </div>
    </div>
  )
}
