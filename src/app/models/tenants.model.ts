import { Tenant } from "./tenant.model";

export class Tenants {
    static getTenants() : Tenant[] {
        const tenants : Tenant[] = [
        {
            title: "Creativity",
            description: "The ability to generate original ideas, solutions, and expressions. In education, fostering creativity encourages innovative thinking, problem-solving, and the development of unique perspectives.",
            imagePath: "creativity.png",
        },
        {
            title: "Curiosity",
            description: "A strong desire to learn, explore, and understand the world. Curiosity is the driving force behind inquiry-based learning, encouraging students to ask questions, seek knowledge, and engage actively in the learning process.",
            imagePath: "curiosity.png",
        },
        {
            title: "Critical Thinking",
            description: "The skill of analyzing, evaluating, and synthesizing information to make informed decisions. Critical thinking is essential in education for problem-solving, reasoning, and developing a deeper understanding of concepts.",
            imagePath: "critical-thinking.png",
        },
        {
            title: "Confidence",
            description: "Believing in one's abilities and ideas. Confidence in education empowers students to participate actively, express themselves, and take risks in their learning journey, leading to increased engagement and success.",
            imagePath: "confidence.png",
        },
        {
            title: "Community",
            description: "Building a supportive and inclusive environment where learners collaborate, share experiences, and learn from one another. Community in education enhances social skills, teamwork, and a sense of belonging, creating a positive learning atmosphere.",
            imagePath: "community.png",
        },
        {
            title: "Calmness",
            description: "Maintaining composure and emotional balance in various situations. Calmness is crucial for effective learning by promoting a focused and stress-free environment, allowing students to approach challenges with a clear mind.",
            imagePath: "calmness.png",
        },
        {
            title: "Compassion",
            description: "Demonstrating empathy, kindness, and understanding towards others. Compassion in education fosters a nurturing environment, promoting positive relationships among students and educators, and enhancing the overall learning experience.",
            imagePath: "compassion.png",
        },
        
        ]
        return tenants;
    }
}