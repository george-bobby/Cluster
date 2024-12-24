function SkillProfilePills({skills}){
    return(
        <div>
            <div className="flex flex-wrap gap-3 items-center">
                {skills.map(skill=>{
                    return(
                        <div key={skill} style={{
                            cursor: 'pointer',
                            background: "#333",
                            color: "#fff",
                            borderRadius: '20px',
                            paddingLeft: '15px',
                            paddingRight: '15px',
                            paddingTop: '7.5px',
                            paddingBottom: '7.5px',
                        }}>
                            {skill}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default SkillProfilePills;