export type NodeType = "file" | "folder";

export interface ExplorerNode {
    id: string;
    name: string;
    path: string;
    type: NodeType;
    children?: ExplorerNode[];

    // 👇 New
    isEditing?: boolean;
}