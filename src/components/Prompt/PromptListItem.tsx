import { ActionIcon, Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { IconSettings, IconTrash } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/redux";
import { Prompt } from "../../database/models/Prompt";
import { getAllPrompts, setSelectedPromptId } from "../../reducers/promptSlice";
import { openPromptFormModal } from "./modals/promptFormModal";

export const PromptListItem = (prompt: Prompt) => {
  const selectedPromptId = useAppSelector(
    (state) => state.prompt.selectedPromptId
  );
  const dispatch = useDispatch();

  const onDelete = () => {
    openConfirmModal({
      title: "删除Prompt",
      labels: { confirm: "确认删除", cancel: "返回" },
      onConfirm: () => {
        window.electronAPI.databaseIpcRenderer.deletePrompt(prompt.id);
        dispatch(getAllPrompts());
      },
      children: (
        <Text size="sm">
          确认要删除 <span className="text-red-500">{prompt.name}</span> 吗？
        </Text>
      ),
    });
  };

  return (
    <div
      className={
        "flex px-2 py-2 my-2 justify-between items-center rounded bg-white shadow " +
        (selectedPromptId === prompt.id
          ? "outline outline-1 outline-blue-400"
          : "hover:cursor-pointer")
      }
      onClick={() => {
        dispatch(setSelectedPromptId(prompt.id));
      }}
    >
      <div className="flex-1 flex items-center text-xs text-gray-500">
        <div>{prompt.name}</div>
      </div>
      <div className="flex">
        <ActionIcon size="sm" radius="lg" color="gray">
          <IconSettings
            onClick={(e) => {
              e.stopPropagation();
              openPromptFormModal(prompt);
            }}
            size={12}
          />
        </ActionIcon>
        <ActionIcon size="sm" radius="lg" color="red">
          <IconTrash
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            size={12}
          />
        </ActionIcon>
      </div>
    </div>
  );
};
