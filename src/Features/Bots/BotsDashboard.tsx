'use client'

import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import Breadcrumbs from "../Components/BreadCrumbs/BreadCrumbs";
import MainContent from "../Structural/MainContent/MainContent";
import Navbar from "../Structural/Navbar/Navbar";
import Sidebar from "../Structural/Sidebar/Sidebar";
import { BREADCRUMBS } from "@/App/Consts";
import { getBots } from "@/Services/bot/botService";
import type { Bot } from "@/Services/bot/bot.types";
import TableList from "../Components/TableList/TableList";
import ConfirmationModal from "../Components/ConfirmationModal/ConfirmationModal";

export default function DashboardPage() {
  const [bots, setBots] = useState<Bot[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isBotDeleteModalOpen, setIsBotDeleteModalOpen] = useState(false);
  const [botToDelete, setBotToDelete] = useState<Bot | null>(null);

  const handleAddBot = () => {
    console.log("Add bot button clicked.");
  };

  const handleOpenBotDeleteModal = (bot: Bot) => {
    setBotToDelete(bot);
    setIsBotDeleteModalOpen(true);
  };

  const confirmBotDelete = () => {
    if (botToDelete) {
      setBots(prev => prev.filter(b => b.id !== botToDelete.id));
      toast.success(`Deleted bot "${botToDelete.name}"`);
      setBotToDelete(null);
    }
    setIsBotDeleteModalOpen(false);
  };

  useEffect(() => {
    const fetchBots = async () => {
      try {
        const data = await getBots();
        setBots(data);
      } catch {
        toast.error("Failed to load bots!");
      }
    };

    fetchBots();
  }, []);

  const mappedBotList = bots.map((bot) => ({
    id: bot.id,
    name: bot.name,
    description: bot.description,
    status: bot.active ? "Active" : "Inactive",
    created: new Date(bot.createdAt).toLocaleDateString(),
    createdBy: bot.createdBy,
    updated: new Date(bot.updatedAt).toLocaleDateString(),
    updatedBy: bot.updatedBy,
    actions: [
      {
        label: "Edit",
        onClick: () => console.log("Edit clicked", bot.id),
      },
      {
        label: "Delete",
        onClick: () => handleOpenBotDeleteModal(bot),
      },
    ],
  }));

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar />
        <Breadcrumbs breadcrumbs={BREADCRUMBS.BOTS} />
        <MainContent>
          <TableList
            data={mappedBotList}
            headers={[
              "id",
              "name",
              "description",
              "status",
              "created",
              "createdBy",
              "updated",
              "updatedBy",
            ]}
            currentPage={currentPage}
            itemsPerPage={10}
            onPageChange={(page) => setCurrentPage(page)}
            showHeaderTitle={false}
            headerTitle="List of Bots"
            showHeaderSearch={true}
            showActionInEllipses={true}
            showSNo={true}
            showActions={true}
            headerButtonText="Add Bot"
            onHeaderButtonClick={() => handleAddBot()}
          />
        </MainContent>
      </div>

      <ConfirmationModal
        open={isBotDeleteModalOpen}
        onClose={() => setIsBotDeleteModalOpen(false)}
        onConfirm={confirmBotDelete}
        title="Delete Bot"
        message={`Are you sure you want to delete the bot "${botToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}
