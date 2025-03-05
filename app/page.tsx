"use client";

import { deleteUserByIdAPI, getUserInfoAPI } from "@/apis/user";
import { EmpInfo } from "@/type/emp";
import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";

export default function Home() {
  // 管理员工数据
  const [data, setData] = useState<EmpInfo[]>([]);

  // 获取员工数据
  const getUserInfo = async () => {
    const res = await getUserInfoAPI();
    // console.log(res);
    setData(res.data);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  // 用与管理被选中用户
  const [checkboxItems, setCheckboxItems] = useState<string[]>();

  // 处理某个复选框被点中
  const handleCheckboxChange = (idx: number) => {
    const isExist = checkboxItems?.some((item) => {
      return item === `checkboxItem-${idx}`;
    });
    if (isExist) {
      setCheckboxItems(
        checkboxItems?.filter((item) => {
          return item !== `checkboxItem-${idx}`;
        })
      );
    } else {
      setCheckboxItems([...(checkboxItems || []), `checkboxItem-${idx}`]);
    }
  };

  // 点击全选按钮
  const handleCheckAllBox = () => {
    // 不管是否全选都要先将选择的item去掉
    setCheckboxItems([]);
    if (checkboxItems?.length !== data.length) {
      const ids: string[] = data.map((item) => {
        return `checkboxItem-${item.id}`;
      });
      setCheckboxItems(ids);
    }
  };

  // 处理删除按钮点击事件
  const handleDelButtonClick = async (id: number) => {
    // 调用删除api
    await deleteUserByIdAPI(id);
    // 刷新员工数据
    getUserInfo();
    toast("删除用户成功");
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 bg-white text-[#1b1f23] dark:bg-black dark:text-white">
      <div className="items-start justify-between md:flex mt-5">
        <div className="max-w-lg">
          <h3 className="text-gray-800 dark:text-white text-xl font-bold sm:text-2xl">
            Team members
          </h3>
          <p className="text-gray-600 dark:text-white mt-2">
            is a you team emp, you need to manager them;
          </p>
        </div>
        <div className="mt-3 md:mt-0">
          <a
            href="javascript:void(0)"
            className="inline-block px-4 py-2 text-white dark:text-black duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
          >
            Add member
          </a>
        </div>
      </div>
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="text-gray-600 dark:text-white font-medium border-b">
            <tr>
              <th className="py-3 px-6 flex items-center gap-x-4">
                <div>
                  <input
                    type="checkbox"
                    id="checkbox-all-items"
                    className="checkbox-item peer hidden"
                    checked={checkboxItems?.length === data.length}
                    onChange={() => handleCheckAllBox()}
                  ></input>
                  <label
                    htmlFor="checkbox-all-items"
                    className="relative flex w-5 h-5 bg-white peer-checked:bg-indigo-600 rounded-md border ring-offset-2 ring-indigo-600 duration-150 peer-active:ring cursor-pointer after:absolute after:inset-x-0 after:top-[3px] after:m-auto after:w-1.5 after:h-2.5 after:border-r-2 after:border-b-2 after:border-white after:rotate-45"
                  ></label>
                </div>
                Username
              </th>
              <th className="py-3 px-6">name</th>
              <th className="py-3 px-6">gender</th>
              <th className="py-3 px-6">createTime</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 dark:text-white divide-y">
            {data.map((item) => (
              <tr key={item.id} className="bg-white dark:bg-black">
                <td className="px-6 py-4 whitespace-nowrap flex items-center gap-x-4">
                  <div>
                    <input
                      type="checkbox"
                      id={`checkbox-${item.id}`}
                      name={`checkbox-${item.id}`}
                      className="checkbox-item peer hidden"
                      checked={checkboxItems?.some(
                        (checkedItem) =>
                          checkedItem === `checkboxItem-${item.id}`
                      )}
                      onChange={() => handleCheckboxChange(item.id)}
                    />
                    <label
                      htmlFor={`checkbox-${item.id}`}
                      className="relative flex w-5 h-5 bg-white peer-checked:bg-indigo-600 rounded-md border ring-offset-2 ring-indigo-600 duration-150 peer-active:ring cursor-pointer after:absolute after:inset-x-0 after:top-[3px] after:m-auto after:w-1.5 after:h-2.5 after:border-r-2 after:border-b-2 after:border-white after:rotate-45"
                    ></label>
                  </div>
                  {item.username}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.gender === 1 ? "男" : "女"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.createTime}
                </td>
                <td className="text-right px-6 whitespace-nowrap">
                  <a
                    href="javascript:void()"
                    className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
                  >
                    Edit
                  </a>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <a
                        href="#"
                        className="py-2 px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
                      >
                        Delete
                      </a>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-black dark:text-white">
                          你确定要删除这个员工吗
                        </AlertDialogTitle>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="text-black dark:text-white">
                          取消
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelButtonClick(item.id)}
                        >
                          确定
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Toaster position="top-center" duration={3000} />
    </div>
  );
}
